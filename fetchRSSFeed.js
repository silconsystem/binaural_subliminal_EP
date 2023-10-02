// URL of the XML document
const xmlUrl = 'rssfeed.xml'

// fetch feed
function fetchRSSFeed() {
  // Fetch the XML document
  fetch(xmlUrl)
    .then(response => response.text())
    .then(data => {
      // Parse the XML document
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');

      // Extract information from <image>
      const channel = xmlDoc.querySelector('channel');
      const channelTitle = channel.querySelector('title').textContent;
      const channelDescription = channel.querySelector('description').textContent;
      const channelLink = channel.querySelector('link').textContent;
      const channelPubDate = channel.querySelector('pubDate').textContent;
      const channelWebMaster = channel.querySelector('webMaster').textContent;
      const images = xmlDoc.querySelectorAll('image');
      const items = xmlDoc.querySelectorAll('item');
      //const channelFunding = xmlDoc.querySelector('funding');
      // Use the namespace URI to create a namespace resolver
      const resolver = xmlDoc.createNSResolver(xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);

      // Use the resolver to find the element with the namespace
      const channelFunding = xmlDoc.evaluate('//podcast:funding', xmlDoc, resolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

      // build static html content
      const pageTitle = document.getElementById('project-title');
      const contentDescription = document.getElementById('project-description');
      const contentLink = document.getElementById('project-link');
      const fundUs = document.getElementById('fund-us-join-us');
      const webMaster = document.getElementById('web-master');
      const pubDate = document.getElementById('web-date');

      pageTitle.textContent = channelTitle;
      contentDescription.textContent = channelDescription;
      contentLink.href = channelLink;
      contentLink.textContent = `website`;
      webMaster.textContent = channelWebMaster;
      pubDate.textContent = channelPubDate;
      
      if (channelFunding) {
        // Access the text content of the element
        const fundingText = channelFunding.textContent;
        fundUs.textContent = fundingText;
        console.log(`Funding: ${fundingText}`);
      } else {
        console.log('podcast:funding element not found.');
      }


      // Iterate through each item and image
      for (let i = 0; i < images.length && items.length; i++) {

        const image = images[i];
        const item = items[i];
        const imageUrl = image.querySelector('url').textContent;
        const imageLink = image.querySelector('link').textContent;
console.log(imageUrl);
        const title = item.querySelector('title').textContent;
        const description = item.querySelector('description').textContent;
        //const enclosure = item.querySelector('enclosure');
        const enclosureUrl = item.querySelector('enclosure').getAttribute('url'); //enclosure ? enclosure.getAttribute('url') : '';


        //console.log(items[i].querySelectorAll('podcast:funding'));
        //console.log(image);
        //console.log(item);
        //console.log(imageUrl);
        //console.log(imageLink);
        //console.log(title);
        //console.log(description);
        //console.log(enclosureUrl);

        try {
          // Create a new article element for each item
          const article = document.createElement('article');
          article.className = 'Card Card--overlay Card--wide';
          article.id = `card-${i + 1}`;

          // Create a div for the Card media
          const mediaDiv = document.createElement('div');
          mediaDiv.className = 'Card__media';
          
          const img = document.createElement('img');
          img.className = 'Card__image';
          img.width = 660;
          img.height = 620;
          img.loading = 'lazy';
          img.src = imageUrl;
          mediaDiv.appendChild(img);
          //article.appendChild(mediaDiv);
          
          //console.log(mediaDiv);
          //console.log(article);

          // Create a div for the Card main content
          const mainDiv = document.createElement('div');
          mainDiv.className = 'Card__main';
          mainDiv.style.marginTop = '60Px';
          mainDiv.style.markerLeft= '50px;'
          //mediaDiv.appendChild(mainDiv);

          // Create an h2 element for the title
          const titleHeading = document.createElement('h2');
          titleHeading.className = 'Card__heading';
          const titleLink = document.createElement('a');
          titleLink.className = 'Card__Link';
          titleLink.href = '#';
          titleLink.textContent = title;
          titleHeading.appendChild(titleLink);
          mainDiv.appendChild(titleHeading);

          //console.log(titleHeading);

          // Create a p element for the description
          const videoLink= document.createElement('a');
          videoLink.textContent = `visualisations for ${title}`;
          videoLink.href = imageLink;
          mainDiv.appendChild(videoLink);

          console.log(mainDiv);
          // Create an audio element for the enclosure
          const audio = document.createElement('audio');
          audio.className = 'audio-player';
          audio.controls = true;
          audio.src = enclosureUrl;
          mainDiv.appendChild(audio);

          
          // Append the mainDiv to the article
          article.appendChild(mediaDiv);
          article.appendChild(mainDiv);

          //console.log(article);

          // Append the article to the document or a container element
          const container = document.getElementById('Carousel'); // Replace 'container' with the ID of your container element
          container.appendChild(article);
        } catch (error) {
          console.log(`error parsing: ${error}`);
        }
      }
      var rssDataLoadedEvent = new Event('rssDataLoaded', function() {
        document.dispatchEvent(rssDataLoadedEvent);
      });
    })
    .catch(error => {
      console.error('Error fetching or parsing XML:', error);
      console.log(error);
    });
}
fetchRSSFeed();
/**
const article = document.createElement('article');
article.className = 'Card Card--overlay Card--wide';
article.id = `card-${i + 1}`;

// Create a div for the Card media
const mediaDiv = document.createElement('div');
mediaDiv.className = 'Card__media';

const img = document.createElement('img');
img.className = 'Card__image';
img.width = 480;
img.height = 480;
img.loading = 'lazy';
img.src = imageUrl;
mediaDiv.appendChild(img);

// Create a div for the Card main content
const mainDiv = document.createElement('div');
mainDiv.className = 'Card__main';

// Create an h2 element for the title
const titleHeading = document.createElement('h2');
titleHeading.className = 'Card__heading';
const titleLink = document.createElement('a');
titleLink.className = 'Card__link'; // lowercase 'l' here
titleLink.href = '#';
titleLink.textContent = title;
titleHeading.appendChild(titleLink);
mainDiv.appendChild(titleHeading);

// Create a p element for the description
const descriptionPara = document.createElement('p');
descriptionPara.textContent = 'This is a generic card pattern.';
mainDiv.appendChild(descriptionPara);

// Create an audio element for the enclosure
const audio = document.createElement('audio');
audio.className = 'audio-player';
audio.controls = true;
audio.src = enclosureUrl;
mainDiv.appendChild(audio);

mediaDiv.appendChild(mainDiv);
article.appendChild(mediaDiv);

// Append the article to the document or a container element
const container = document.getElementById('Carousel'); // Replace 'Carousel' with the ID of your container element
container.appendChild(article);

**/