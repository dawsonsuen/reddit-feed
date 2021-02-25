import axios from 'axios';
import moment from 'moment';

/**
 *
 * @param {String} channelName Name of the reddit channel
 * @returns {Object} { posts, topPost, postUrl, score }
 */
export const getChannelInfoFromReddit = async ({ channelName }) => {
	const url = `https://www.reddit.com/r/${channelName}.json`;
	const result = await axios.get(url);

	const posts = result.data.data.children;
	const topPost = posts[0];
	const created_utc = topPost.data.created_utc;
	const avatar =
		topPost.data.preview &&
		topPost.data.preview.images[0].source.url.replace('amp;s', 's');

	return {
		channelName: topPost.data.subreddit,
		topPostTitle: topPost.data.title,
		topPostUrl: topPost.data.url,
		topPostScore: topPost.data.score,
		avatar: avatar,
		createdTime: moment.unix(created_utc).format('MMM DD, YYYY, h:mm A'),
	};
};
