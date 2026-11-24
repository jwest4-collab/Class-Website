const navigation = document.querySelector("nav[aria-label='Main navigation']");
const menuButton = navigation.querySelector(".nav-toggle");
const mobileViewport = window.matchMedia("(max-width: 36rem)");

function setMenuCollapsed(collapsed) {
	navigation.classList.toggle("is-collapsed", collapsed);
	menuButton.setAttribute("aria-expanded", String(!collapsed));
}

menuButton.classList.add("is-available");
setMenuCollapsed(mobileViewport.matches);

menuButton.addEventListener("click", () => {
	setMenuCollapsed(!navigation.classList.contains("is-collapsed"));
});

navigation.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && !navigation.classList.contains("is-collapsed")) {
		setMenuCollapsed(true);
		menuButton.focus();
	}
});

navigation.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => {
		if (mobileViewport.matches) {
			setMenuCollapsed(true);
		}
	});
});

mobileViewport.addEventListener("change", (event) => {
	setMenuCollapsed(event.matches);
});
