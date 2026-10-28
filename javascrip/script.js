document.addEventListener("DOMContentLoaded", function () {


    const boutonMenu = document.getElementById("menu-hamburger");
    const menuNavigation = document.getElementById("menu-navigation");

    const formulaire = document.getElementById("form-contact");
    const boutonCommander = document.getElementById("checkout");

    const champNom = document.getElementById("nom");
    const champPrenom = document.getElementById("prenom");
    const champTelephone = document.getElementById("tel");
    const champMessage = document.getElementById("message");

    const numeroWhatsApp = "2290192450882";

    if (boutonMenu && menuNavigation) {

        menuNavigation.classList.remove("menu-ouvert");

        boutonMenu.textContent = "☰";
        boutonMenu.setAttribute("aria-expanded", "false");
        boutonMenu.setAttribute("aria-label", "Ouvrir le menu");

        boutonMenu.addEventListener("click", function () {

            const menuEstOuvert =
                menuNavigation.classList.toggle("menu-ouvert");

            if (menuEstOuvert) {

                boutonMenu.textContent = "✕";

                boutonMenu.setAttribute(
                    "aria-expanded",
                    "true"
                );

                boutonMenu.setAttribute(
                    "aria-label",
                    "Fermer le menu"
                );

            } else {

                boutonMenu.textContent = "☰";

                boutonMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                boutonMenu.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );
            }

        });
        const liensMenu = menuNavigation.querySelectorAll("a");

        liensMenu.forEach(function (lien) {

            lien.addEventListener("click", function () {

                menuNavigation.classList.remove("menu-ouvert");

                boutonMenu.textContent = "☰";

                boutonMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                boutonMenu.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );

            });

        });
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                menuNavigation.classList.remove("menu-ouvert");

                boutonMenu.textContent = "☰";

                boutonMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                boutonMenu.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );
            }

        });

    }

    function ouvrirWhatsApp(texte) {

        const lienWhatsApp =
            "https://wa.me/" +
            numeroWhatsApp +
            "?text=" +
            encodeURIComponent(texte);

        window.open(
            lienWhatsApp,
            "_blank",
            "noopener,noreferrer"
        );

    }

    function recupererInformations() {

        return {

            nom: champNom ? champNom.value.trim() : "",

            prenom: champPrenom
                ? champPrenom.value.trim()
                : "",

            telephone: champTelephone
                ? champTelephone.value.trim()
                : "",

            message: champMessage
                ? champMessage.value.trim()
                : ""

        };

    }

    if (formulaire) {

        formulaire.addEventListener(
            "submit",
            function (event) {
                event.preventDefault();

                const client = recupererInformations();
                if (
                    !client.nom ||
                    !client.prenom ||
                    !client.telephone ||
                    !client.message
                ) {

                    alert(
                        "Merci de remplir tous les champs avant de continuer."
                    );

                    return;
                }
                const texteCommande =

                    "Bonjour Belle Éclat Cosmétiques !\n\n" +

                    "Je vous contacte depuis votre site web.\n\n" +

                    "Nom : " +
                    client.nom +
                    "\n" +

                    "Prénom : " +
                    client.prenom +
                    "\n" +

                    "Téléphone : " +
                    client.telephone +
                    "\n\n" +

                    "Ma commande ou mon message :\n" +
                    client.message +
                    "\n\n" +

                    "Merci de me répondre. Bonne journée !";

                ouvrirWhatsApp(texteCommande);

            }
        );

    }

    if (boutonCommander) {

        boutonCommander.addEventListener(
            "click",
            function () {

                const client = recupererInformations();

                let texteCommande =

                    "Bonjour Belle Éclat Cosmétiques !\n\n" +

                    "Je souhaite passer une commande depuis votre site.\n";

                if (client.nom) {

                    texteCommande +=
                        "\nNom : " + client.nom;

                }

                if (client.prenom) {

                    texteCommande +=
                        "\nPrénom : " + client.prenom;

                }

                if (client.telephone) {

                    texteCommande +=
                        "\nTéléphone : " + client.telephone;

                }

                if (client.message) {

                    texteCommande +=
                        "\n\nMa commande :\n" + client.message;

                } else {

                    texteCommande +=

                        "\n\nJe voudrais connaître vos produits disponibles et leurs prix.";

                }


                texteCommande +=

                    "\n\nMerci de me renseigner sur les produits disponibles.";

                ouvrirWhatsApp(texteCommande);

            }
        );

    }

    const elementsAnimes = document.querySelectorAll(
        "main > section, .hero-image, .contact-carte, .avis"
    );
    const animationsReduites = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if (
        "IntersectionObserver" in window &&
        !animationsReduites
    ) {

        elementsAnimes.forEach(function (element) {

            element.classList.add("js-reveal");

        });


        const observateur = new IntersectionObserver(

            function (entrees, observer) {

                entrees.forEach(function (entree) {

                    if (entree.isIntersecting) {

                        entree.target.classList.add("visible");

                        observer.unobserve(entree.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


        elementsAnimes.forEach(function (element) {

            observateur.observe(element);

        });

    }

    console.log(
        "Belle Éclat Cosmétiques : JavaScript chargé avec succès !"
    );

});
