const columns = document.querySelectorAll(".column");


document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
});


document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
});


columns.forEach((column) => {
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        const applyAfter = getNewPosition(column, e.clientY);
        if (applyAfter) {
            applyAfter.insertAdjacentElement("afterend", dragging);
        } else {
            column.prepend(dragging);
        }
    });
});


function getNewPosition(column, position) {
    const cards = column.querySelectorAll(".item:not(.dragging)");
    let result;
    for (let referCard of cards) {
        const box = referCard.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;
        if (position >= boxCenterY) {
            result = referCard;
        }
    }
    return result;
}


