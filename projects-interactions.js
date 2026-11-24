const ideaForm = document.querySelector("#idea-form");
const ideaInput = document.querySelector("#idea-input");
const ideaError = document.querySelector("#idea-error");
const ideaList = document.querySelector("#idea-list");
const emptyMessage = document.querySelector("#idea-empty");
const addIdeaButton = document.querySelector("#add-idea");

ideaInput.addEventListener("input", () => {
	const hasContent = Boolean(ideaInput.value.trim());
	ideaInput.classList.toggle("has-content", hasContent);

	if (hasContent) {
		ideaInput.removeAttribute("aria-invalid");
		ideaError.textContent = "";
	}
});

function addIdea() {
	const ideaText = ideaInput.value.trim();

	if (!ideaText) {
		ideaInput.setAttribute("aria-invalid", "true");
		ideaError.textContent = "Enter a project idea before adding it.";
		ideaInput.focus();
		return;
	}

	const listItem = document.createElement("li");
	const label = document.createElement("span");
	const removeButton = document.createElement("button");

	label.textContent = ideaText;
	removeButton.className = "remove-idea";
	removeButton.type = "button";
	removeButton.textContent = "Remove";
	removeButton.setAttribute("aria-label", `Remove idea: ${ideaText}`);
	removeButton.addEventListener("click", () => {
		const itemIndex = Array.from(ideaList.children).indexOf(listItem);
		listItem.remove();
		emptyMessage.hidden = ideaList.children.length > 0;
		const nextItem = ideaList.children[Math.min(itemIndex, ideaList.children.length - 1)];
		(nextItem ? nextItem.querySelector("button") : ideaInput).focus();
	});

	listItem.className = "idea-list-item";
	listItem.appendChild(label);
	listItem.appendChild(removeButton);
	ideaList.appendChild(listItem);
	emptyMessage.hidden = true;
	ideaInput.value = "";
	ideaInput.classList.remove("has-content");
	ideaInput.focus();
}

ideaForm.addEventListener("submit", (event) => {
	event.preventDefault();
	addIdea();
});

addIdeaButton.addEventListener("click", (event) => {
	event.preventDefault();
	addIdea();
});
