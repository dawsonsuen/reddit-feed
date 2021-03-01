const populateListToHtml = (channelList) => {
  document.getElementById(
    "subCounts"
  ).innerText = `${channelList.length}/5 Channels`;

  document.getElementById("subRedditList").innerHTML = channelList
    .map(
      (channel) =>
      `<div id="listItem">
				<div><button id="closebox" type="button" onClick="unSubscribe('${channel.channelName}')">X</button></div>

				<div id="redditDetail">
					<div><img id="avatar" src="${channel.avatar}" onerror="this.src='public/err.png'" alt="No Image"/></div>
					<div id="redditInfo">
						<div id="name" class="info-item">r/  ${channel.channelName}</div>
						<a id="link" href="${channel.topPostUrl}" target="_blank">${channel.topPostTitle}</a>
						<div id="date">
							<span>${channel.topPostScore}<img id="thump-up" src="public/up.webp"></span>
							<span style="margin:10px">|</span>
							<span>${channel.createdTime}</span>
						</div>
					</div>	
				</div>
			</div>`
    )
    .join("");
};

const subscribe = () => {
  const channelName = document.getElementById("subReddit").value;

  if (channelName.trim() === "") {
    return;
  }

  if (channelName.indexOf(" ") > 0) {
    window.alert("Please remove the space between your input!");
  }

  fetch("https://reddity-feed-challenge.herokuapp.com/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ channelName: channelName }),
  })
    .then((response) => response.json())
    .then((data) => {
      populateListToHtml(data.channelList);
    })
    .catch((err) => {
      window.alert("Reddit doesn't exist.");
    });
};

const subscriptions = () => {
  fetch("https://reddity-feed-challenge.herokuapp.com/subscriptions")
    .then((response) => response.json())
    .then((data) => {
      populateListToHtml(data.channelList);
    })
    .catch((err) => {
      console.log(err);
    });
};

const unSubscribe = (channelName) => {
  fetch(`https://reddity-feed-challenge.herokuapp.com/subscribe/${channelName}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      populateListToHtml(data.channelList);
    });
};
