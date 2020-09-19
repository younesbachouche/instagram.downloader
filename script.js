// Template
const body = `<main>
	<header class="navbar">
		<input type="text" value="#" placeholder="Paste address here">
    <button class="search" onclick="extractHtml()"> Download </button>
	</header>
	<section class="result">
		<div class="no-image"></div>
    <p>This Website will afford you the ability to Download <b>public</b> pictures and videos in a very easy way from <b>Instagram</b> , and here are the steps ;</p><p>In the chosen  image/video on your Instagram, click on the 3 dots ( right up) <b>copy the link</b> then paste it on the sidebar of the website and click <b>download</b></p><p>This page does not save any information do not worry :).</p>
	</section>
	<footer>Made with ♥ by Younes Bachouche</footer>
</main>`;
// insert in body
document.body.innerHTML = body;

const _ = e => document.querySelector(e);
const render = _('.result');


// create video
const createVideo = data => {
  let v = document.createElement('video');
  v.id = "instavideo";
  v.src = data.content; // data.content
  v.controls = true;
  v.autoplay = true;

  // create info
  let info = document.createElement('p');
  info.textContent = "Click the right button on video and select save as.";

  render.innerHTML = ""; // clear body
  render.appendChild(v); // append video
  render.appendChild(info); // append link
};
// create image
const createImg = data => {
  // create image
  let i = document.createElement('img');
  i.id = "instaImg";
  i.src = data.content;

  // create info
  let info = document.createElement('p');
  info.textContent = "Click the right button on the image and select save image..";

  render.innerHTML = ""; // clear body
  render.appendChild(i); // append image	
  render.appendChild(info); // append link

};

// extract html
const extractHtml = () => {
  render.innerHTML = "<div class='no-image'></div>";
  // get input value
  let url = _('input').value;
  if (url) {
    fetch(url).
    then(r => r.text()).
    then(r => {
      // render html
      render.innerHTML = r;
      // wait, find meta and create video or image
      let w = setTimeout(() => {
        let v = _('meta[property="og:video"]');
        if (v) {
          createVideo(v);
        } else {
          let img = _('meta[property="og:image"]');
          if (img) {
            createImg(img);
          } else {
            document.body.innerHTML = body;
            alert('Error extracting Instagram image / video.');
          };
        }
        clearTimeout(w);
      }, 200);
    });
  } else {
    _('input').setAttribute('placeholder', 'Invalid address, use a good');

  }
};
