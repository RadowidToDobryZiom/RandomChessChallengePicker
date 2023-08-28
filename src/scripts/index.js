arr = [];

const Main = () => {
  if (
    window.location.href === "https://www.chess.com/play/online" ||
    window.location.href.startsWith("https://www.chess.com/game/live")
  ) {
    //RANDOM CHALLENGE BUTTON
    let space2 = document.querySelector(
      ".ui_v5-button-component.ui_v5-button-primary.ui_v5-button-large.ui_v5-button-full"
    );

    let przycisk = document.querySelector(".random-challenge-button");
    let button = document.createElement("button");
    let buttonReset = document.createElement("button");
    if (space2 && !przycisk) {
      button.innerHTML = "Accept random challenge";
      button.classList.add("random-challenge-button");
      space2.insertAdjacentElement("afterend", button);
      button.style.backgroundColor = "#7fa650";
      button.style.borderWidth = "0px";
      button.style.borderBottom = ".5rem #648444 solid";
      button.style.color = "white";
      button.style.fontFamily = "Montserrat, sans-serif";
      button.style.borderRadius = "1rem";
      button.style.height = "40px";
      button.style.width = "width: 100%";

      buttonReset.innerHTML = "Clear the blacklist";
      buttonReset.classList.add("random-challenge-button");
      button.insertAdjacentElement("afterend", buttonReset);
      buttonReset.style.backgroundColor = "#7fa650";
      buttonReset.style.borderWidth = "0px";
      buttonReset.style.borderBottom = ".5rem #648444 solid";
      buttonReset.style.color = "white";
      buttonReset.style.fontFamily = "Montserrat, sans-serif";
      buttonReset.style.borderRadius = "1rem";
      buttonReset.style.height = "40px";
      buttonReset.style.width = "width: 100%";
    }

    button.addEventListener("click", function () {
      let incoming_challenges = document.querySelector(
        ".incoming-challenges-component"
      );

      if (incoming_challenges) {
        let data = Array.from(incoming_challenges.children).map((child) => {
          return {
            username: child.children[1].textContent.split("\n")[0],
            button: child.children[2].children[1],
          };
        });

        console.log(data);
        let whitelistedButtons = data.filter((element) => {
          const blacklist = JSON.parse(localStorage.getItem("usernames")) || [];
          return !blacklist.includes(element.username);
        });

        if (whitelistedButtons.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * whitelistedButtons.length
          );
          blacklist = JSON.parse(localStorage.getItem("usernames")) || [];

          whitelistedButtons[randomIndex].button.click();

          localStorage.setItem(
            "usernames",
            JSON.stringify([
              ...blacklist,
              whitelistedButtons[randomIndex].username,
            ])
          );
        } else {
          alert("No whitelisted challenges available.");
        }
      } else {
        alert("There are no challenges!");
      }
    });

    button.addEventListener("mouseenter", function (event) {
      button.style.backgroundColor = "#95bb4a";
    });

    button.addEventListener("mouseleave", function (event) {
      button.style.backgroundColor = "#7fa650";
    });

    buttonReset.addEventListener("mouseenter", function (event) {
      buttonReset.style.backgroundColor = "#95bb4a";
    });

    buttonReset.addEventListener("mouseleave", function (event) {
      buttonReset.style.backgroundColor = "#7fa650";
    });

    buttonReset.addEventListener("click", function (event) {
      if (localStorage.getItem("usernames") == "") {
        alert("Blacklist is empty");
      } else {
        localStorage.removeItem("usernames");
        alert("Blacklist cleared");
      }
    });
  }
};

function handleMutation(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList" || mutation.type === "attributes") {
      Main();
    }
  }
}

const observer = new MutationObserver(handleMutation);

const observerOptions = {
  childList: true,
  attributes: true,
  subtree: true,
  characterData: true,
};

observer.observe(document.body, observerOptions);
