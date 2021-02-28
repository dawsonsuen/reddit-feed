import { getChannelInfoFromReddit } from "./service.js";

/** Properties:
 *  channelName,
    topPostTitle,
    topPostUrl,
    topPostScore,
    createdTime,
 */
const channelList = [];

export const subscriptions = async (req, res) => {
  res.json({
    channelList: channelList,
  });
};

export const subscribe = async (req, res) => {
  const { channelName } = req.body;

  try {
    const result = await getChannelInfoFromReddit({ channelName: channelName });

    if (
      channelList
        .map((channel) => channel.channelName)
        .includes(result.channelName)
    ) {
      return res.json({
        channelList: channelList,
      });
    }

    if (channelList.length >= 5) {
      channelList.shift();
    }

    channelList.push(result);
    res.json({
      channelList: channelList,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
};

export const unSubscribe = async (req, res) => {
  const { channelName } = req.params;

  const index = channelList.findIndex(
    (channel) => channel.channelName.toLowerCase() === channelName.toLowerCase()
  );

  if (index !== -1) {
    channelList.splice(index, 1);
  }
  res.json({
    channelList: channelList,
  });
};
