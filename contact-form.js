const form = document.querySelector("#contact-form");
const errorSummary = document.querySelector("#form-errors");
const statusMessage = document.querySelector("#form-status");
const fields = [...form.querySelectorAll("input, textarea")];

function messageFor(field) {
	if (field.validity.valueMissing) {
		return "Please complete this required field.";
	}

	if (field.validity.typeMismatch) {
		return "Enter a valid email address.";
	}

	return "";
}

function updateField(field) {
	const error = document.querySelector(`#${field.id.replace("contact-", "")}-error`);
	const message = messageFor(field);
	error.textContent = message;
	error.hidden = !message;
	field.setAttribute("aria-invalid", String(Boolean(message)));
	return Boolean(message);
}

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const hasErrors = fields.map(updateField).some(Boolean);
	statusMessage.textContent = "";
	errorSummary.hidden = !hasErrors;

	if (hasErrors) {
		errorSummary.focus();
		return;
	}

	statusMessage.textContent = "Your message is complete, but this class-project form does not send it.";
});

fields.forEach((field) => {
	field.addEventListener("input", () => {
		if (!field.hasAttribute("aria-invalid")) {
			return;
		}

		updateField(field);
		errorSummary.hidden = fields.every((item) => item.validity.valid);
	});
});
