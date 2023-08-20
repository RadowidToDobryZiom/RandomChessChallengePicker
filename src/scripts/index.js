arr = [];

const Main = () => {
  if (
    window.location.href === "https://www.chess.com/play/online" ||
    window.location.href.startsWith("https://www.chess.com/game/live")
  ) {
    //RANDOM CHALLENGE BUTTON
    let space = document.querySelector(
      ".new-game-index-component.tab-content-component"
    );

    let space2 = document.querySelector(
      ".ui_v5-button-component.ui_v5-button-primary.ui_v5-button-large.ui_v5-button-full"
    );

    let przycisk = document.querySelector(".random-challenge-button");
    let button = document.createElement("button");
    let buttonReset = document.createElement("button");
    if (space2 && !przycisk) {
      button.innerHTML = "Accept random challenge";
      button.classList.add("random-challenge-button");
      // space.appendChild(button);
      // space2.insertBefore(button, space2.child);
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
      // space.appendChild(button);
      // space2.insertBefore(button, space2.child);
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
      let buttonsNodeList = document.querySelectorAll(
        ".ui_v5-button-component.ui_v5-button-primary.ui_v5-button-x-small.incoming-challenges-button"
      );
      let buttons = Array.from(buttonsNodeList);

      if (buttons.length != 0) {
        let incoming_challenges = document.querySelector(
          ".incoming-challenges-middle"
        );

        if (incoming_challenges) {
          let i = 0;
          while (i <= buttons.length) {
            i++;
            let randomIndex = Math.floor(Math.random() * buttons.length);
            let username =
              incoming_challenges.children[randomIndex].children[0].textContent;
            console.log(username);
            if (!localStorage.getItem("usernames").includes(username)) {
              let randomButton = buttons[randomIndex];
              console.log(username);
              randomButton.click();
              let previousData = localStorage.getItem("usernames");
              localStorage.setItem("usernames", previousData + username + " ");

              break;
            }
            if (i >= buttons.length) {
              alert("All users are on the blacklist.");
              return;
            }
          }

          // console.log(username[0].innerTEXT)
        }
      } else {
        alert("There are no challenges.");
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
        localStorage.setItem("usernames", "");
        alert("Blacklist cleared");
      }
    });
    let incoming_challenges = document.querySelector(
      ".incoming-challenges-middle"
    );
  }
};

function handleMutation(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList" || mutation.type === "attributes") {
      console.log("DOM CHANGED");
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
