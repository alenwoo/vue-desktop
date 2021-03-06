export const graphNodes = [{
  label:'开始',
  type:'start'
},{
  label:'任务',
  type:'task'
},{
  label:'结束',
  type:'end'
},{
  label:'异常',
  type:'error'
}]

export const initGraph = function(){
  graph.setConnectable(true);
  graph.setAutoSizeCells(true);
  graph.graphHandler.guidesEnabled = true;
  
  var oldGetPreferredSizeForCell = graph.getPreferredSizeForCell;
  graph.getPreferredSizeForCell = function(cell){
    var result = oldGetPreferredSizeForCell.apply(this, arguments);
    if (result != null){
      var label = cell.getAttribute('label');
      function cLength(str){
        var array = [0,0];
        var len = 0;
        for ( var i = 0; i < str.length; i++) {
          var a = str.charAt(i);
          if (a.match(/[^\x00-\xff]/ig) != null) {
            array[0] += 1;
          } else {
            array[1] += 1;
          }
        }
        return array;
      } 
      var lengthArray = cLength(label);
      var extWidth = lengthArray[0]*15.5+lengthArray[1]*8.2;
      result.width = Math.max(96, 36+extWidth);
    }
    return result;
  };
  
  graph.addListener(mxEvent.LABEL_CHANGED, (sender, evt)=>{
    var cell = evt.getProperty('cell');
    this.curCell = cell;
    var isVertex = graph.model.isVertex(cell);
    if(isVertex){
      if(!cell.getAttribute('isSymbol')){
        var edges = cell.edges;
        for(var i in edges){
          var edge = edges[i];
          if(edge.target == cell){
            edge.setAttribute('label','to '+cell.getAttribute('label'));
          }
        }
        var model = graph.getModel();
        var size = graph.getPreferredSizeForCell(cell);
        var geometry = model.getGeometry(cell);
        geometry.width = size.width;
        geometry.height = size.height;
      }
    }
  });
  
  graph.addListener(mxEvent.CELL_CONNECTED, function(sender, evt){
    var edge = evt.getProperty('edge');
    var source = evt.getProperty('source');
    var terminal = evt.getProperty('terminal');
    if(!source && terminal){
      edge.setAttribute('label','to '+terminal.getAttribute('label'));
    }
  });
  graph.selectionModel.addListener(mxEvent.CHANGE, (sender, evt)=>{
    var added = evt.getProperty('added');
    var removed = evt.getProperty('removed');
    var model = graph.getModel();
    model.beginUpdate();
    try{
      var workflow = editor.graph.model.getCell(0);
      if(added.length==1){
        this.curCell = added[0]
      }
      if(removed && removed.length==1){
        this.curCell = removed[0]
      }else{
        this.curCell = workflow;
      }
      graph.refresh();
    }catch(e){
      alert(e);
    }finally{
      model.endUpdate();
    }
  });
  
  new mxOutline(graph, document.getElementById('outline'));
  if(this.taskId){
    utils.http.post('/workflow/process/graph', {taskId:this.taskId}).then(response => {
      let graphXml = response.data.body.data.graphXml.replace(/[\r\n]/g, '')
      let doc = mxUtils.parseXml(graphXml);
      let node = doc.documentElement;
      editor.readGraphModel(node);
      graph.setCellsLocked(true);
    }, error => {
      console.log(error)
      alert('流程图加载失败！');
    })
  }
  if(this.processInstanceId){
    //file monitor animation
    graph.setConnectable(false)
    graph.setAutoSizeCells(false)
    graph.graphHandler.guidesEnabled = false
    utils.http.post('/workflow/process/history', {processInstanceId:this.processInstanceId}).then(response => {
      let cells = graph.model.cells
      let current = response.data.body.data.current
      let history = response.data.body.data.history
      console.log(cells,current,history)
      graph.model.beginUpdate()
      for(let c in cells){
        let cell = cells[c]
        if(cell.isEdge() && cell.source.getAttribute('nodeType')=='start'){
          graph.model.setStyle(cell, 'historyEdge')
          continue
        }
        for(var i=0;i<history.length;i++){
          if(cell.isEdge()){
            if(history[i].activity==cell.source.getAttribute('label') && history[i].transition==cell.target.getAttribute("label")){
              graph.model.setStyle(cell, 'historyEdge');

              // var state = graph.view.getState(cell);
              // state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
              // state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', '6');
              // state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', 'lightGray');
              // state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'flow');
              // console.log(state.shape.node.getElementsByTagName('path').length)
            }
          }else{
            if(history[i].activity==cell.getAttribute('label')){
              cell.setAttribute('eid',history[i].eid);
              cell.setAttribute('assigner',history[i].assigner);
              cell.setAttribute('createTime',history[i].createTime);
              cell.setAttribute('endTime',history[i].endTime);
              cell.setAttribute('userId',history[i].userId);
              graph.model.setStyle(cell, 'historyVertex');
              var incomingEdges = graph.model.getIncomingEdges(cell);
              if(incomingEdges.length==1){
                graph.model.setStyle(incomingEdges[0], 'historyEdge');
              }
            }
          }
        }
        for(var i=0;i<current.length;i++){
          if(current[i].activity==cell.getAttribute('label')){
            graph.model.setStyle(cell, 'currentVertex');
            cell.setAttribute('current',true);
            cell.setAttribute('eid',current[i].eid);
            cell.setAttribute('assigner',current[i].assigner);
            cell.setAttribute('candidate',current[i].candidate);
          }
        }
      }
      graph.model.endUpdate();
    }, error => {
      console.log(error)
    })
  }
  if(this.processId){
    utils.http.post('/workflow/process/details', {pid:this.processId}).then(response => {
      let graphXml = response.data.body.data.graphXml.replace(/[\r\n]/g, '')
      console.log(graphXml)
      let doc = mxUtils.parseXml(graphXml);
      let node = doc.documentElement;
      editor.readGraphModel(node);
      this.curCell = editor.graph.model.getCell(0)
    }, error => {
      console.log(error)
      alert('流程图加载失败！');
    })
  }else{
    this.curCell = editor.graph.model.getCell(0)
  }
}

export const initToolbar = function(){
  var start = editor.getTemplate('start');
  var end = editor.getTemplate('end');
  var error = editor.getTemplate('error');
  var task = editor.getTemplate('task');
  
  var nodes = document.querySelectorAll('.graphElement');

  var mxCells = [
    new mxCell(start.value, start.geometry, start.style),
    new mxCell(task.value, task.geometry, task.style),
    new mxCell(end.value, end.geometry, end.style),
    new mxCell(error.value, error.geometry, error.style)
  ];
  
  var installDrag = function(index){
    var cells = [mxCells[index]];
    cells[0].vertex = true;
    
    var funct = function(graph, evt, target, x, y){
      cells = graph.getImportableCells(cells);
      if (cells.length > 0){
        var validDropTarget = (target != null)?graph.isValidDropTarget(target, cells, evt) : false;
        var select = null;
        if (target != null && !validDropTarget && graph.getModel().getChildCount(target) == 0 && graph.getModel().isVertex(target) == cells[0].vertex){
          graph.getModel().setStyle(target, style);
          select = [target];
        }else{
          if (target != null && !validDropTarget){
            target = null;
          }
          if (graph.isSplitEnabled() && graph.isSplitTarget(target, cells, evt)){
            graph.splitEdge(target, cells, null, x, y);
            select = cells;
          }else{
            cells = graph.getImportableCells(cells);
            if (cells.length > 0){
              select = graph.importCells(cells, x, y, target);
            }
          }
        }
        
        if (select != null && select.length > 0){
          graph.scrollCellToVisible(select[0]);
          graph.setSelectionCells(select);
        }
      }
    };

    var dragPreview = document.createElement('div');
    dragPreview.className = 'drop-no';
    dragPreview.innerHTML = '<img src="'+nodes[index].src+'" width="48" height="48"/><div class="icon-drop"></div>'
    var ds = mxUtils.makeDraggable(nodes[index], graph, funct, dragPreview, -5, -5,graph.autoscroll, true,true);
    var graphContainer = document.querySelector('.graph-container')
    ds.dragEnter = function(){
      document.querySelector('.drop-no').className = 'drop-yes'
    };
    ds.dragExit = function(){
      document.querySelector('.drop-yes').className = 'drop-no'
    };
  };
  
  for(var i=0;i<mxCells.length;i++){
    installDrag(i);
  }
}

export const handler = {
  save(){
    let enc = new mxCodec();
    let node = enc.encode(editor.graph.model);
    let graphXml = mxUtils.getXml(node, editor.linefeed);
    console.log(graphXml);
    utils.http.post('/workflow/process/save', {
      graphXml: graphXml
    }).then(response => {
      let idMap = response.data.body.data
      let workflow = editor.graph.model.getCell(0);
      let cells = editor.graph.model.cells;
      workflow.setAttribute("workflowId",idMap.workflowId);
      for(let i in cells){
        if(graph.model.isVertex(cells[i])){
          let nodeId = idMap[cells[i].id];
          cells[i].setAttribute("nodeId",nodeId);
        }
      }
      this.$messager.alert({
        title: '保存成功',
        msg: '流程【'+workflow.getAttribute('label')+'】保存成功！'
      })
      this.close({
        name:'processEditor',
        text:'流程设计',
        icon:'./static/img/icon32/molecule.png'
      })
      if(this.menu.onClose){
        this.menu.onClose()
      }
    })

    // $.ajax({
    //   url:contextPath+'/workflow!save.action',
    //   data:{'param.graphXml':graphXml},
    //   success:function(json){
    //     var status = json.status;
    //     if(status==0){
    //       var workflow = editor.graph.model.getCell(0);
    //     var cells = editor.graph.model.cells;
    //     workflow.setAttribute("workflowId",json.data.workflowId);
    //     for(var i in cells){
    //       if(graph.model.isVertex(cells[i])){
    //         var nodeId = json.data[cells[i].id];
    //         cells[i].setAttribute("nodeId",nodeId);
    //       }
    //     }
    //     Lxt.MessageUtils.success('保存流程', '流程保存成功！');
    //     }else if(status==2){
    //       Lxt.MessageUtils.fail('保存流程','对不起，您没有权限执行此操作，请联系管理员！');
    //     }else if(status==3){
    //       Lxt.MessageUtils.fail('保存流程','流程保存失败！失败原因：'+json.msg);
    //     }
    //   }
    // });
  }
}