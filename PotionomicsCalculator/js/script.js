Papa.parse("data/ingredients.csv", {
	download: true,
	header: true,
	complete: function(results) {
		populateTable(results.data)
	}
});

function populateTable(data) {
    console.log("INGREDIENTS DATA:", data);
    for (let key in data) {
        let ing = data[key];
        let row =
            "<tr>" +
            "<td><img class=\"i-icon\" src=\"img/ingredients/" + toImageUrl(ing.NAME) + "\"></td>" +
            "<td class=\"i-name\">" + ing.NAME + "</td>" +
            "<td><input class=\"i-unlocked\" type=\"checkbox\" name=\"unlockedAtQuinn\" value=\"" + ing.NAME + "\"></td>" +
            "<td><input class=\"i-quantity\" type=\"number\" name=\"quantityOwned\" min=\"0\" max=\"99\" value=\"0\"></td>" +
            "</tr>";
        $("#ingredientsTable tbody").append(row);
    }
}

function toImageUrl(name) {
    return name.replaceAll(" ", "_").replaceAll("'","") + ".webp";
}

$(document).ready(function(){
    $("#settingsSection").hide();
    $("#resultsSection").hide();
    $('input[type="radio"][class="sectionButton"').click(function(){
        var inputValue = $(this).attr("value");
        var targetSection = $("#" + inputValue + "Section");
        $(".section").not(targetSection).hide();
        $(targetSection).show();
    });
});

function tickAll() {
    let checkboxes = document.getElementsByName("unlockedAtQuinn");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
    }
}

function untickAll() {
    let checkboxes = document.getElementsByName("unlockedAtQuinn");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}

function setQuantityAll(quantity) {
    let inputs = document.getElementsByName("quantityOwned");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = quantity;
    }
}

function saveIngredients() {
    try {
        let ingredientSettings = [];
        let tableLen = $("#ingredientsTable tbody tr").length;
        for (let i = 0; i < tableLen; i++) {
            let name = $(".i-name").get(i).innerHTML;
            let unlocked = $(".i-unlocked").get(i).checked;
            let quantity = $(".i-quantity").get(i).value;
            //console.log(name + ", " + unlocked + ", " + quantity);
            ingredientSettings.push({
                "name" : name,
                "unlocked" : unlocked,
                "quantity" : parseInt(quantity)
            });
        }
        let savedStr = JSON.stringify(ingredientSettings);
        console.log("SAVED TO LOCALSTORAGE:", str);
        console.log(ingredientSettings);
        localStorage.setItem('ingredientSettings', JSON.stringify(str));
        let saveLoadMessage = document.getElementById("saveLoadMessage");
        saveLoadMessage.innerHTML = "Saved ingredients to local storage!";
        saveLoadMessage.style.color = "green";
    } catch (err) {
        let saveLoadMessage = document.getElementById("saveLoadMessage");
        saveLoadMessage.innerHTML = err;
        saveLoadMessage.style.color = "red";
        console.error(err);
    }
}

function loadIngredients() {
    try {
        let loadedStr = JSON.parse(localStorage.getItem("ingredientSettings"));
        console.log("LOADED FROM LOCALSTORAGE:", loadedStr);
        let ingredientSettings = JSON.parse(loadedStr);
        console.log(ingredientSettings);
        let tableLen = $("#ingredientsTable tbody tr").length;
        for (let i = 0; i < tableLen; i++) {
            $(".i-unlocked").get(i).checked = ingredientSettings[i].unlocked;
            $(".i-quantity").get(i).value = ingredientSettings[i].quantity;
        }
        let saveLoadMessage = document.getElementById("saveLoadMessage");
        saveLoadMessage.innerHTML = "Loaded ingredients from local storage!";
        saveLoadMessage.style.color = "green";
    } catch (err) {
        let saveLoadMessage = document.getElementById("saveLoadMessage");
        saveLoadMessage.innerHTML = err;
        saveLoadMessage.style.color = "red";
        console.error(err);
    }
}