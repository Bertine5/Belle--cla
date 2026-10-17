const NUMERO_WHATSAPP = "2290192450882";
function ouvrirWhatsApp(texte) {
    const lien = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(texte);
    window.open(lien, "_blank", "noopener");
}

document.addEventListener("DOMContentLoaded", function () {
    const boutonCommander = document.getElementById("checkout");
    if (boutonCommander) {
        boutonCommander.addEventListener("click", function () {
            ouvrirWhatsApp("Bonjour Belle Éclat, je souhaite passer une commande. Pouvez-vous m'aider ?");
        });
    }

    const formulaire = document.getElementById("form-contact");
    if (formulaire) {
        formulaire.addEventListener("submit", function (e) {
            e.preventDefault();

            const nom = document.getElementById("nom").value.trim();
            const tel = document.getElementById("tel").value.trim();
            const message = document.getElementById("message").value.trim();
            const chiffres = tel.replace(/\D/g, "");
            if (chiffres.length < 8) {
                alert("Veuillez entrer un numéro de téléphone valide.");
                return;
            }

            ouvrirWhatsApp(
                "Bonjour, je m'appelle " + nom + " (" + tel + "). " + message
            );
            formulaire.reset();
        });
    }

    const liensMenu = document.querySelectorAll("nav a");
    const sections = [];

    liensMenu.forEach(function (lien) {
        const cible = document.querySelector(lien.getAttribute("href"));
        if (cible) sections.push({ lien: lien, section: cible });
    });

    function mettreAJourMenu() {
        const position = window.scrollY + 140;
        let actif = null;

        sections.forEach(function (item) {
            if (item.section.offsetTop <= position) actif = item;
        });

        liensMenu.forEach(function (lien) {
            lien.style.color = "";
            lien.style.borderBottomColor = "";
        });

        if (actif) {
            actif.lien.style.color = "#f2b705";
            actif.lien.style.borderBottomColor = "#f2b705";
        }
    }

    window.addEventListener("scroll", mettreAJourMenu);
    mettreAJourMenu();

    const elementsAnimes = document.querySelectorAll(
        "main > section:not(.accueil), .carte-produit, .avantage, .avis"
    );

    if ("IntersectionObserver" in window) {
        const observateur = new IntersectionObserver(function (entrees) {
            entrees.forEach(function (entree) {
                if (entree.isIntersecting) {
                    entree.target.style.opacity = "1";
                    entree.target.style.transform = "translateY(0)";
                    observateur.unobserve(entree.target);
                }
            });
        }, { threshold: 0.1 });

        elementsAnimes.forEach(function (el) {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
            observateur.observe(el);
        });
    }

    const boutonHaut = document.createElement("button");
    boutonHaut.textContent = "↑";
    boutonHaut.setAttribute("aria-label", "Retour en haut");
    boutonHaut.style.cssText =
        "position:fixed;left:18px;bottom:18px;z-index:200;width:46px;height:46px;" +
        "border-radius:50%;border:3px solid #231409;background:#f2b705;color:#231409;" +
        "font-size:1.4rem;font-weight:800;cursor:pointer;display:none;" +
        "box-shadow:3px 3px 0 #231409;";
    document.body.appendChild(boutonHaut);

    window.addEventListener("scroll", function () {
        boutonHaut.style.display = window.scrollY > 400 ? "block" : "none";
    });

    boutonHaut.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const droits = document.querySelector(".pied-droits");
    if (droits) {
        droits.textContent =
            "© " + new Date().getFullYear() + " Belle Éclat. Tous droits réservés.";
    }
});