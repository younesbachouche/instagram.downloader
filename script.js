// Template
const body = `<main>
	<header class="navbar">
		<input type="text" value="https://www.instagram.com/p/BzVwWQBi-9S/" placeholder="Paste address here">
    <button class="search" onclick="extractHtml()">Render</button>
	</header>
	<section class="result">
		<div class="no-image"></div>
    <p>On this page you can download images or <b>public</b> videos from Instagram accounts, in the application you can go to the image and to the right <b>(the 3 points)</b> in the menu you give it to copy image and paste it or if you are on the computer you just have to Copy the link.</p><p>To save an image from the mobile phone, press and hold until the menu comes out and then download the image if it is from the computer, simply right click save image.</p>
<p>To save a video from your mobile, click on the 3 dots and download and if you are on the computer, right click and save as.</p><p>This page does not save any information do not worry :).</p>
	</section>
	<footer>Make width ♥ Moncho Varela</footer>
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