/**
 * datatable pagination jump
 *
 * @link http://drmsite.blogspot.com/2015/03/datatable-jump-to-page-functionality.html
 * @link https://datatables.net/forums/discussion/32860/how-i-get-id-table
 * @link https://datatables.net/reference/api/draw()
 */
function dataTablePaginationJump(dtElem)
{
  var dtElem = dtElem !== undefined ? dtElem : "table.dataTable";

  var myTable = $(dtElem).DataTable();

  var myTableId = myTable.table().node().id; // e.g. "DataTables_Table_0"
  var myTableEllipsisId = myTableId + "_ellipsis";

  $(document).on('click', "#" + myTableEllipsisId, function(){
    var pageInfo = myTable.page.info();

    var firstPageNum = 1;
    var lastPageNum = pageInfo.pages;

    var num = promptForNumberRange(firstPageNum, lastPageNum);

    if(num){
      num = parseInt(num, 10);
      var index = num - 1;

      myTable.page(index).draw(false);
    }
  });
}

/**
 * Show prompt that are valid only for numeric.
 *
 * @param int minNum
 * @param int maxNum
 * @param str placeholder (optional)
 * @return int or bool(false)
 */
function promptForNumberRange(minNum, maxNum, placeholder)
{
  var minNum = parseInt(minNum, 10);
  var maxNum = parseInt(maxNum, 10);

  if(placeholder === undefined){
    var placeholder = "確認したいページ番号を半角数字で入力してください。\n有効な値は次の範囲です。 " + minNum + " ～ " + maxNum;
  }

  var inputVal = window.prompt(placeholder, "");
  if(inputVal === null){ // cancel button pressed.
    return false;
  }

  var inputNum = parseInt(inputVal, 10);
  return checkNumberRange(minNum, maxNum, inputNum);
}

/**
 * Check if input value is within the specified numerical range.
 *
 * @param int minNum
 * @param int maxNum
 * @param int inputNum
 * @return int
 * @link https://stackoverflow.com/questions/15047140/javascript-prompt-number-and-continue-prompting-if-answer-is-wrong
 */
function checkNumberRange(minNum, maxNum, inputNum)
{
  var minNum = parseInt(minNum, 10);
  var maxNum = parseInt(maxNum, 10);
  var inputNum = parseInt(inputNum, 10);
  if(inputNum >= minNum && inputNum <= maxNum){
    return inputNum;
  }
  else if(isNaN(inputNum)){
    var errorText = "入力された値が半角数値ではありません。\n有効な値は次の範囲です。 " + minNum + " ～ " + maxNum;
    return promptForNumberRange(minNum, maxNum, errorText);
  }
  else {
    var errorText = "入力された値(" + inputNum + ") は有効な値ではありません。\n有効な値は次の範囲です。 " + minNum + " ～ " + maxNum;
    return promptForNumberRange(minNum, maxNum, errorText);
  }
}