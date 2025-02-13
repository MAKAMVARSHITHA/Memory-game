(() => {
  let btn; //to store the button elements
  let ArrayBts = []; //contains all buttons
  let fail = document.querySelector(".fail"); //quit button element
  let clickedEl1, clickedEl2; //vars for storing the clicked button 
  let FirstNum, SecondNum; //vars for storing the clicked button numbers respectively for comparison
  let count = 1; //to store the count of the clicks(buttons)
  let tableNameCount = 0; //to store the value of how many times the btn is clicked from the respective table.
  let guessCount = 0; // to store the value of the guess 
  let successCount = 0; // to store how many pairs are identified
  let length; // table length is stored 
  let easy_level = document.querySelector(".easy"); //easy level button element
  let moderate_level = document.querySelector(".moderate"); //moderate level button element
  let difficult_level = document.querySelector(".difficult"); //difficult level button element
  let start_game = document.querySelector(".start-game"); //start game block component
  let back = document.querySelector(".back"); //back button element
  let levels = document.querySelector(".levels"); //levels game block component
  let point = document.querySelector(".points"); //to store the points
  let points_block = document.querySelector(".points-block");
  let credits_para = document.querySelector(".credits");
  let limit_count = document.querySelector(".limit_count");
  let total_guess_limit ;
  limit_count.innerHTML = 15;

  //to shuffle the digits which are in the array
  var shuffle = (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      console.log(i, array[i]);
    }
  };

  //to generate the 2 unique tables
  var generateUniqueTable = (rows, cols, table) => {
    table.innerHTML = ""; // Clear previous content
    let digits = Array.from({ length: length }, (_, i) => i); // Digits based on the level
    shuffle(digits); // Shuffle to randomize order
    let index = 0;
    for (let i = 0; i < rows; i++) {
      let row = table.insertRow();
      for (let j = 0; j < cols; j++) {
        let cell = row.insertCell();
        cell.classList.add(`block`);
        cell.textContent = digits[index++];
      }
    }
  };

  //to open all the buttons when we click on the quit button
  var buttonHandler = () => {
    back.style.display = 'block';
    ArrayBts.forEach((clicks) => {
      clicks.classList.add("clicked");
    });
  };

  //to comparing the 2 numbers which are selected in the 2 tables
  var compare = () => {
    if (FirstNum == SecondNum) {
      successCount++;
      console.log(clickedEl1);
      console.log(clickedEl2);
      clickedEl1.parentElement.parentElement.classList.add(`success`);
      clickedEl2.parentElement.parentElement.classList.add(`success`);
      clickedEl1.style.display = "none";
      clickedEl2.style.display = "none";
      if (successCount == length) { //if successfully found all pairs then display congo
        setTimeout(function () {
          points_block.style.display = 'block';
          let points = successCount*100;
          credits_para.innerHTML = "Congratulations";
          point.innerHTML = points;
          back.style.display = 'block';
        }, 1000);
      }
    } else {
      setTimeout(function () {
        clickedEl1.classList.remove("clicked");
        clickedEl2.classList.remove("clicked");
      }, 500);
      tableNameCount = 0;
    }
  };

  var clickable = () => {
    let blocks = document.querySelectorAll(".block"); // Select elements with class "block"

    blocks.forEach((block) => {
      let div = document.createElement("div"); // Create a new div
      div.classList.add(`click`);
      block.appendChild(div); // Append div inside each .block element
      btn = document.createElement("button");
      div.appendChild(btn);
      btn.classList.add("btns");
      btn.id = Math.floor(Math.random() * 1000); //to generate different Ids to the buttons
      ArrayBts.push(btn);
    });
  };

  //to store the clicked button num to the variables 
  var storeNum = (element) => {
    if (count == 1) { //represents 1st table
      element.classList.add("clicked");
      clickedEl1 = element;
      FirstNum = element.parentElement.parentElement.textContent.trim();
      console.log(FirstNum);
      count++;
    } else if (count == 2) { //represents 2nd table
      element.classList.add("clicked");
      clickedEl2 = element;
      SecondNum = element.parentElement.parentElement.textContent.trim();
      console.log(SecondNum);
      count = 1;
      compare();
    } else {
      count = 1;
    }
  };

  //functionality that should generate after clicking the button 
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("btns")) {
      var clickedID = event.target.id;
      let element = document.getElementById(clickedID);
      let tableName =
        element.parentElement.parentElement.parentElement.parentElement
          .parentElement.className;
      if (tableNameCount == 0 && tableName == "initial-table") {
        console.log(element);
        storeNum(element);
        tableNameCount = 1;
        console.log(tableNameCount);
        guessCount++;
        console.log("guesscount" + guessCount);
      } else {
        if (tableNameCount == 1 && tableName == "secondary-table") {
          tableNameCount = 0;
          storeNum(element);
          total_guess_limit = 15 - guessCount;
          limit_count.innerHTML = total_guess_limit;

          if (guessCount >= 15) {
            console.log(guessCount);
            setTimeout(function () {
              points_block.style.display = 'block';
            credits_para.innerHTML = "Well tried";
            let points = successCount*100;
            point.innerHTML = points;
            },1000);
          }
          setTimeout(function () {
            if(total_guess_limit == 0) {
              alert('completed the chances');
            }
          },1000);
          console.log(tableNameCount);
        }
      }
    }
  });

  //to call the generateUniqueTable on based on the level chosen
  init = (row, col) => {
    let initalTable = document.querySelector(".initial-table");
    let secondaryTable = document.querySelector(".secondary-table");
    let ArrayTable = [initalTable, secondaryTable];
    ArrayTable.forEach((Table) => {
      generateUniqueTable(row, col, Table);
    });
    clickable();
  };

  fail.addEventListener("click", buttonHandler); // event on clicking the quit button

  //event on clicking the back button
  back.addEventListener("click", () => {
    levels.style.display = "block";
    start_game.style.display = "none";
    points_block.style.display = 'none';
    tableNameCount = 0;
    count = 1;
  });

  //making the values reset on after clicking the back button
  var resetValues = () => {
    guessCount = 0;
    successCount = 0;
    start_game.style.display = "block";
    levels.style.display = "none";
    back.style.display = 'none';
    limit_count.innerHTML = 15;
  };

  //event on clicking the easy level button
  easy_level.addEventListener("click", () => {
    let row = 3;
    let col = 2;
    length = 6;
    resetValues();
    init(row, col);
  });

  //event on clicking the moderate level button
  moderate_level.addEventListener("click", () => {
    let row = 3;
    let col = 3;
    length = 9;
    resetValues();
    init(row, col);
  });

  //event on clicking the difficult level button
  difficult_level.addEventListener("click", () => {
    let row = 2;
    let col = 5;
    length = 10;
    resetValues();
    init(row, col);
  });
})();