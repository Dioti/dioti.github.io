Papa.parse("data/ingredients.csv", {
	download: true,
	header: true,
	complete: function(results) {
		populateTable(results.data)
	}
});

function populateTable(data) {
    console.log(data);
    for (let key in data) {
        let ing = data[key];
        let row =
            "<tr>" +
            "<td><img class=\"ingredientsIcon\" src=\"img/ingredients/" + toImageUrl(ing.NAME) + "\"></td>" +
            "<td>" + ing.NAME + "</td>" +
            "<td><input type=\"checkbox\" class=\"unlockedAtQuinn\" name=\"unlockedAtQuinn\" value=\"" + ing.NAME + "\"></td>" +
            "<td><input type=\"number\" class=\"quantityOwned\" name=\"quantityOwned\" min=\"0\" max=\"99\" value=\"0\"></td>" +
            "</tr>";
        $("#ingredientsTable tbody").append(row);
    }
}

function toImageUrl(name) {
    return name.replaceAll(" ", "_").replaceAll("'","") + ".webp";
}

function selectAll() {
    let checkboxes = document.getElementsByName("unlockedAtQuinn");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
    }
}

function deselectAll() {
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