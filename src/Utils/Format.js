import { ONE_DAY_MS } from './Constants';

const padNum = (num) => {
  return num < 10 ? num.toString().padStart(2,"0") : num.toString();
}

const getArrayOrValue = array => (array && Array.isArray(array) && array.length ? array[0] : array);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = padNum(date.getDay());
  const month= padNum(date.getMonth() + 1);
  const year = padNum(date.getFullYear());
  return `${day}/${month}/${year}`;
}

const formatDuration = (duration ) => {
  if (!duration)  return '-';
  const sections = duration.split(':');
  if (sections.length === 2) {
    return duration;
  } else if (sections.length === 3) { // case HH:MM:SS
      const hourToMs = parseInt(duration.slice(0,sections[0].length) * (60 * 60), 10) * 1000;
      const minutesToMs = (parseInt(duration.slice(sections[0].length + 1, sections[0].length + 1 + sections[1].length), 10) * 60) * 1000;
      const secondsToMs = parseInt(duration.slice(sections[0].length + sections[1].length + 2), 10) * 1000;
      const totalMs = hourToMs + minutesToMs + secondsToMs;
      const seconds = (totalMs / 1000) % 60;
      const minutes = ((totalMs / 1000) - seconds) / 60;
      return `${padNum(minutes)}:${padNum(seconds)}`
  } else if (sections.length === 1) { // case SS
      const seconds = (duration) % 60;
      const minutes = (duration - seconds) / 60;
      return `${padNum(minutes)}:${padNum(seconds)}`
  }
}

const Format = {
  isNeededNewData: (localStorageData) => {
    const storageDate =  (localStorageData && localStorageData.date) || 0;
    return !localStorageData || (storageDate - new Date() > ONE_DAY_MS );
  },

  formatPodcast: (data) => {
      return {
        id: data.id.attributes['im:id'],
        title: data['im:name'].label,
        author: data['im:artist'].label,
        image: getArrayOrValue(data['im:image'][2])['label'],
      };
  },

  formatPodcastDetail: (data, podcastId) => {
    return ({
      id: podcastId,
      author: getArrayOrValue(data['itunes:author']),
      title: getArrayOrValue(data['title']),
      description: getArrayOrValue(data['description']),
      image: getArrayOrValue(data['itunes:image']).$.href,
      items: data['item'].map((item, idx) => {
          return {
            id: idx,
            title: getArrayOrValue(item['title']),
            description: getArrayOrValue(item.description),
            author: item['itunes:author'] || 'No data available',
            url: getArrayOrValue(item.enclosure).$.url,
            duration: formatDuration(getArrayOrValue(item['itunes:duration'])),
            pubDate: formatDate(getArrayOrValue(item['pubDate'])),
          }
      }),
    });
  },
}

export default Format;
