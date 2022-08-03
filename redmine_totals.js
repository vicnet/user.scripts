// ==UserScript==
// @id             redmine_totals
// @name           Redmine Totals
// @version        0.1
// @namespace      http://jamesarobertson.co.nz/
// @author         James Robertson
// @description    Redmine issue list totals
// @run-at         document-end
// @match          https://tina.mysharets.fr/*/issues
// @match          https://tina.mysharets.fr/*/issues?*
// ==/UserScript==

// Correction si la colonne se trouve après le % d'avancement (2 TD à l'intérieur d'un TD)

function isDate(str) {
  return !isNaN(Date.parse(str));
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function addRowValuesToTotals(row, totals) {
  var cell_content;
  var cell_value;
  //var cells = row.getElementsByTagName('td');
  var cells = row.childNodes;
  var col_num = 0;
  var done_ratio;
  for (var cell_num=0; cell_num<cells.length; cell_num++) {
    var cell = cells[cell_num];
    if (cell.tagName !== 'TD') continue;
    if (col_num<2) {
      col_num +=1;
      continue;
    }
    cell_content = cell.innerHTML;
     //console.log(col_num+': cell_content: <'+cell_content+'> date: '+isDate(cell_content)+'  num: '+isNumber(cell_content));
    if (cell.className==='done_ratio') {
      // recupere le ratio de progression et calcule le % sur les elements affiches suivants
      var ratio = cell.getElementsByClassName('todo')[0];
      if (ratio) {
        done_ratio = parseFloat(ratio.style.width) / 100;
      }
    }
    //if (!isDate(cell_content)) {
    if (isNumber(cell_content)) {
        cell_value = parseFloat(cell_content);
        if(!totals[col_num].total) {
          totals[col_num].total = 0;
          totals[col_num].percent = 0;
          totals[col_num].group_total = 0;
          totals[col_num].group_percent = 0;
        }
        totals[col_num].total += cell_value;
        totals[col_num].group_total += cell_value;
        if (done_ratio) {
          var todo = cell_value*done_ratio;
          totals[col_num].percent += todo;
          totals[col_num].group_percent += todo;
          cell.innerHTML = cell_content + ' (🔧' + todo.toFixed(1)+')';
        }
//  }
    }
    col_num +=1;
  }
  return totals;
}

function insertTotalsRow(table_body, totals, is_group_total, before_row) {
  if(is_group_total==null) is_group_total = false;

  var totals_row = document.createElement('tr');

  totals_row.style.textAlign = 'center';
  if (!is_group_total){
    totals_row.style.borderTop = "1px solid #CCCCCC";
    totals_row.style.fontWeight = 'bold';
  }

  var cell;
  for (var col_num=1; col_num<totals.length; col_num++){
    cell = document.createElement('td');
    if (col_num == 1) {
      cell.colSpan = 2;
      if (is_group_total) {
        cell.innerHTML = '&nbsp;';
      } else {
        cell.innerHTML = 'Total';
      }
    } else {
      var total = totals[col_num]
      if (total.total){
        if(is_group_total) {
          cell.innerHTML = total.group_total;
          cell.style.borderTop = "1px solid #CCCCCC";
          if (total.group_percent) {
            cell.innerHTML +=' (🔧'+total.group_percent.toFixed(1)+')';
          }
        } else {
          cell.innerHTML = total.total;
          if (total.percent) {
            cell.innerHTML +=' (🔧'+total.percent.toFixed(1)+')';
          }
        }
      } else {
        cell.innerHTML = '&nbsp;';
      }
    }
    totals_row.appendChild(cell);
  }
  if(before_row != null){
    table_body.insertBefore(totals_row, before_row);
  } else {
    table_body.appendChild(totals_row);
  }
}

function main() {
  var issues_table = document.getElementsByClassName('list issues')[0];
  if(!issues_table) return;

  var head_cells = issues_table.getElementsByTagName('th');
  var table_body = issues_table.getElementsByTagName('tbody')[0];
  var table_rows = table_body.getElementsByTagName('tr');

  var totals = new Array();
  var has_groups = false;
  var has_multiple_groups = false;

  for (var col_num=0; col_num<head_cells.length; col_num++) {
    totals[col_num] = new Object();
  }

  for (var row_num=0; row_num<table_rows.length; row_num++) {
    if(table_rows[row_num].className.indexOf('group') >= 0){
      if (!has_groups) {
        has_groups = true;
      } else {
        has_multiple_groups = true;
        insertTotalsRow(table_body, totals, true, table_rows[row_num]);
        for (var col_num=0; col_num<totals.length; col_num++){
          if (totals[col_num].total){
            totals[col_num].group_total = 0;
            totals[col_num].group_percent = 0;
          }
        }
        row_num++;
      }
    } else {
      totals = addRowValuesToTotals(table_rows[row_num], totals);
    }
  }

  if (has_multiple_groups) {
    insertTotalsRow(table_body, totals, true);
  }
  insertTotalsRow(table_body, totals);
}

main();
