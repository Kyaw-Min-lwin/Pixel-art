let colorPicker = document.querySelector(`input[type="color"]`);
let colorPickerWrapper = document.querySelector(".color-picker-wrapper");
colorPicker.onchange = function () {
	colorPickerWrapper.style.backgroundColor = colorPicker.value;
};
colorPickerWrapper.style.backgroundColor = colorPicker.value;

function validate(amount) {
	//checks if number is an integer or is a decimal
	if (!Number.isNaN(+amount) && +amount > 0) {
		if (Number.isInteger(amount * 1) && !!(amount + '').includes('.')) {
			return amount + "p";
		} else {
			if (amount.match(/.+\..+/)) {
				return "£" + amount;
			}
			else {
				return false;
			}
		}
	}

	// the amount is in string format from this point on
	// check if it includes a £ symbol or a penny(p) symbol
	if (amount.includes("£") === false && amount.includes("p") === false) {
		return false;
	}

	if (
		!!Number.isNaN(Number(amount.replace(/£|p/g, ""))) ||
		amount.replace(/£|p/g, "").length <= 0
	) {
		return false;
	}
	// if it is in a format such that it includes both £ and p symbols
	if (
		amount.includes("£") &&
		amount.includes("p") &&
		amount.match(/^£.+p$/) &&
		amount.match(/^£.+p$/).length === 1
	) {
		if (Number.isNaN(Number(amount.slice(1, -1))) || Number(amount.slice(1, -1)) <= 0) {
			return false;
		}
		return amount.slice(0, -1);
	}

	// check if there is a £ at the start or a p at the end n make sure the amount is positive
	if (
		amount.match(/(^£.*)|(.*p$)/g) &&
		amount.match(/£|p/g).length === 1 &&
		!amount.includes("-")
	) {
		return amount;
	}
	return false;
}

function someUnamedFunction(amount, arr) {
	let j = 0,
		storage = [],
		coinCount;

	for (let i = arr.length - 1; i >= 0 && amount > 0; i--) {
		coinCount = 0;
		j = arr[i];
		if (amount === arr[i]) {
			amount -= arr[i];
			coinCount++;
			storage.push([coinCount, arr[i]]);
			continue;
		}
		if (amount > j) {
			while (amount >= j) {
				coinCount++;
				j += arr[i];
			}
			j = j - arr[i];
			amount -= j;
			storage.push([coinCount, arr[i]]);
		}
	}
	return storage;
}

function leastAmount(amount) {
	let str = "";
	let pounds = [1, 2];
	let pence = [1, 2, 5, 10, 20, 50];

	// if the amount is in pounds
	if (amount.includes("£")) {
		amount = Number(amount.slice(1));
		if (amount % 1 !== 0) {
			//if it's in decimal form
			str += returnString(someUnamedFunction(Math.floor(amount / 1), pounds), "£") + ", ";
			str += returnString(someUnamedFunction((amount % 1).toFixed(2) * 100, pence), "p");
		} else {
			str += returnString(someUnamedFunction(amount, pounds), "£");
		}
	} else {
		amount = Number(amount.slice(0, -1));
		if (amount % 1 !== 0) {
			//if it's in decimal form
			str += returnString(someUnamedFunction(Math.floor(amount / 1), pounds), "£") + ", ";
			str += returnString(someUnamedFunction((amount % 1).toFixed(2) * 100, pence), "p");
		}
		// if the amount is in pence
		else if (amount >= 100) {
			// must be converted to pounds first
			str +=
				returnString(
					someUnamedFunction(Math.floor(amount / 100), pounds),
					"£"
				) + ", ";
			str += returnString(someUnamedFunction(amount % 100, pence), "p");
		} else {
			// It is 100% in pence and less than 100 pence
			str += returnString(someUnamedFunction(amount, pence), "p");
		}
	}
	return str
		.split(",")
		.filter((a) => a.length > 1)
		.join(",");
}

function returnString(arr, unit) {
	let str = "",
		coin = "coin";
	if (unit === "p") {
		arr.forEach((array) => {
			coin = array[0] > 1 ? "coins" : "coin";
			str += `${array[0]} ${array[1]}${unit} ${coin}, `;
		});
	} else {
		arr.forEach((array) => {
			coin = array[0] > 1 ? "coins" : "coin";
			str += `${array[0]} ${unit}${array[1]} ${coin}, `;
		});
	}

	str = str.slice(0, -2).split(",");
	let a = str[str.length - 1];
	if (str.length > 1) {
		return str.slice(0, -1).join(",") + ` and${a}`;
	} else {
		return str;
	}
}

function minCoins(amount) {
	console.log("\n");
	console.log(amount);
	amount = validate(amount);
	if (!amount) {
		return "Invalid input - enter a positive amount of money";
	}

	return leastAmount(amount).trim();
}

console.log(minCoins('42.p'));
console.log(minCoins(105));
console.log(minCoins('£3.3'));
