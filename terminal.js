(function (window, document, undefined) {

  var terminal_row = `
    <span class="term_head" style="color:lightgreen;">➜ </span>
    <input type="text" class="command_input" size="1">
  `;

  var Terminal = {
    init: function ( terminal_container ) {
      this.container = terminal_container;
      this.generateRow( terminal_container );
      window.addEventListener('click', function () {
        document.getElementsByClassName('current')[0].children[1].focus();
      })
    },
    generateRow: function ( terminal_container ) {
      var that = this;
      var t, current, input;
      t = document.createElement('div');
      current = document.querySelectorAll(".current")[0];
      if(current){
        current.children[1].disabled = true;
        current.className = 'inner_terminal';
      }
      t.className = 'current inner_terminal';
      t.innerHTML = terminal_row;
      terminal_container.appendChild(t);
      current = terminal_container.querySelector('.current');
      var input = current.children[1];
      input.focus();
      input.addEventListener('keydown', that.consoleTypingHandler );
      return t;
    },
    getSTDIN: function (command) {
      var that = this;
      var res = that.parseCommand(command);
      that.sendSTDOUT(res);
    },
    sendSTDOUT: function (message) {
      var res = document.createElement('p');
      res.innerText = message;
      this.container.appendChild(res);
      this.generateRow(this.container);
    },
    parseCommand:function (command) {
      console.log(command);
      return "OK";
    },
    consoleTypingHandler: function (e) {
      var input = this;
      var size = input.size;
      var key = e.which || e.keyCode;
      if (key === 13){
        Terminal.getSTDIN(input.value);
        return;
      } else {
        input.size += 1;
      }
    },

  };


  window.Terminal = Terminal;

  document.onkeydown = function (e) {
    var evtobj = window.event? event : e
    //if (evtobj.ctrlKey || evtobj.altKey || evtobj.shiftKey || evtobj.metaKey && !evtobj.Backspace) e.preventDefault();
  }

})(window, window.document)