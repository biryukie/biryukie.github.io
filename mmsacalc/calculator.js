var foods = [
/*Any foods with #+#+#: the first number is the base time required to make the food, the additional numbers are other foods that are needed to make the food.*/
	{"Name": "None", "Time": 0},
	/*Bakery*/
	{"Name": "Bread", "Time": 3},
	{"Name": "Honey Toast", "Time": 5},
	{"Name": "Cookie", "Time": 10},
	{"Name": "Gratin", "Time": 45+10},
	{"Name": "Pizza", "Time": 60+10+20},
	{"Name": "Anpan", "Time": 120},
	/*Dairy*/
	{"Name": "Cream", "Time": 3},
	{"Name": "Butter", "Time": 5},
	{"Name": "Cheese", "Time": 10},
	{"Name": "Caramel", "Time": 30},
	{"Name": "Yogurt", "Time": 45},
	/*Fryer*/
	{"Name": "Fries", "Time": 8},
	{"Name": "Croquette", "Time": 15},
	{"Name": "Donut", "Time": 20+5},
	{"Name": "Chips", "Time": 20},
	{"Name": "Porkfry", "Time": 60},
	{"Name": "Corndog", "Time": 30+120+60},
	/*Pan*/
	{"Name": "Pancake", "Time": 20},
	{"Name": "Butter Potato", "Time": 30+5},
	{"Name": "Bacon and Eggs", "Time": 40+20},
	{"Name": "Dumplings", "Time": 60},
	{"Name": "Omelette", "Time": 45+10+10},
	{"Name": "Fried Rice", "Time": 60},
	{"Name": "Taiyaki", "Time": 30},
	{"Name": "Crepe", "Time": 30+3},
	/*Smokehouse*/
	{"Name": "Bacon", "Time": 20},
	{"Name": "Ham", "Time": 30},
	{"Name": "Sausage", "Time": 120},
	/*Ice Cream Maker*/
	{"Name": "Vanilla Ice Cream", "Time": 40},
	{"Name": "Coconut Banana Ice Cream", "Time": 50},
	{"Name": "Strawberry Mousse", "Time": 60+3},
	{"Name": "Chocolate Sundae", "Time": 240+3+10},
	{"Name": "Snow Cone", "Time": 60+120},
	{"Name": "Caramel Ice Cream", "Time": 50+30+30},
	/*Pot*/
	{"Name": "Ketchup", "Time": 60},
	{"Name": "Strawberry Jam", "Time": 120},
	{"Name": "Carbonara", "Time": 60+20},
	{"Name": "Cabbage Roll", "Time": 60},
	{"Name": "Stew", "Time": 120+3},
	{"Name": "Red Rice", "Time": 120},
	/*Mixer*/
	{"Name": "Tomato Juice", "Time": 90},
	{"Name": "Corn Soup", "Time": 120+3+3},
	{"Name": "Coconut Strawberry Milk", "Time": 90},
	{"Name": "Apple Juice", "Time": 120},
	{"Name": "Vegetable Juice", "Time": 180},
	/*Kitchen*/
	{"Name": "Potato Salad", "Time": 30},
	{"Name": "Sandwich", "Time": 30+3+3+30},
	{"Name": "Rice Cake", "Time": 120},
	{"Name": "Pork Rice", "Time": 120},
	{"Name": "Strawberry Daifuku", "Time": 60},
	{"Name": "Hot Dog", "Time": 30+3+120+60},
	/*Cake Oven*/
	{"Name": "Apple Pie", "Time": 120},
	{"Name": "Cheesecake", "Time": 240+10+10+10+10},
	{"Name": "Strawberry Cake", "Time": 180+3},
	{"Name": "Banana Pound Cake", "Time": 180},
	{"Name": "Coconut Cake", "Time": 180},
	{"Name": "Chocolate Cake", "Time": 120+5},
	/*Bread Factory*/
	{"Name": "Croissant", "Time": 45+5},
	{"Name": "Corn-topped Roll", "Time": 50},
	{"Name": "Jam-filled Roll", "Time": 30+120},
	/*Soy Mortar*/
	{"Name": "Tofu", "Time": 30},
	{"Name": "Miso", "Time": 45},
	{"Name": "Soy Sauce", "Time": 60},
	/*Steamer*/
	{"Name": "Pudding", "Time": 50},
	{"Name": "Egg Custard", "Time": 75},
	{"Name": "Shumai", "Time": 90},
];

function ConstructFoodListings(){
	for(var id in foods){
		var food = foods[id];
		document.write("<option value='" + food.Time + "'>" + food.Name + "</option>");
	}
}

function amountNumbers(){
	var amountNumbers = new Array();
	amountNumbers[0] = "<option value='0'>0</option>";
	amountNumbers[1] = "<option value='1'>1</option>";
	amountNumbers[2] = "<option value='2'>2</option>";
	amountNumbers[3] = "<option value='3'>3</option>";
	
	for (var i=0; i<amountNumbers.length; i++) {
		document.write(""+amountNumbers[i]+"");
	}
}

function calculateNew() {
	var foodOneNew = parseFloat(document.getElementById("foodOneNew").value);
	var foodOneAmountNew = parseFloat(document.getElementById("foodOneAmountNew").value);
	var foodTwoNew = parseFloat(document.getElementById("foodTwoNew").value);
	var foodTwoAmountNew = parseFloat(document.getElementById("foodTwoAmountNew").value);
	var foodThreeNew = parseFloat(document.getElementById("foodThreeNew").value);
	var foodThreeAmountNew = parseFloat(document.getElementById("foodThreeAmountNew").value);
	var customerOfferNew = parseFloat(document.getElementById("customerOfferNew").value);
	var calculationNew = customerOfferNew/((foodOneNew*foodOneAmountNew)+(foodTwoNew*foodTwoAmountNew)+(foodThreeNew*foodThreeAmountNew));
	if (calculationNew > 100) {
		calculationOfferNew.innerHTML = "You will be paid at a rate of <b><font color='#2BAB14'>"+calculationNew+"</font></b> gold per minute of work!";
	}	else {
		calculationOfferNew.innerHTML = "You will only be paid at a rate of <b><font color='#E02A2A'>"+calculationNew+"</font></b> gold per minute of work.";
	}
}