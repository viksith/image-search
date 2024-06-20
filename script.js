const accessKey='Ik9aN0NVKY-K7YKyJ2jhPbsM9dJ2bUynEHnkI21TFA0';



const searchForm=document.querySelector('form');
const imagesContainer=document.querySelector('.image-container');

const searchInput=document.querySelector('.search-input');
const loadMoreButton=document.querySelector('.loadMoreButton');
let page=1;
const fetchImages=  async (query,pageNo)=>{
  try{

  
  if(pageNo===1){
  imagesContainer.innerHTML='';
  }

  const url= `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;


  const response =  await fetch(url);
  const data= await response.json();
  if(data.results.length>0){

  

  data.results.forEach( photo => {
    const imageElement = document.createElement('div');

    imageElement.classList.add('imageDiv');

    imageElement.innerHTML = ` <img src="${photo.urls.regular}"/>`;

    const overlayElement=document.createElement('div');
    overlayElement.classList.add('overlay');

    const overlayText=document.createElement('h3');
    overlayText.innerText=`${photo.alt_description}`;
    overlayElement.appendChild(overlayText);


    imageElement.appendChild(overlayElement);

    imagesContainer.appendChild(imageElement);
  });
  if(data.total_pages===pageNo){
    loadMoreButton.style.display="none";
  }
  else{
    loadMoreButton.style.display="block";
  }
}
else{
  imagesContainer.innerHTML=`<h2>No Image Found.</h2>`;

}
}
catch(error){
  imagesContainer.innerHTML=`<h2>Failed to Fetch Images</h2>`;
}


}

searchForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const inputText=searchInput.value.trim();
  if(inputText!=='')
    {
      page=1;

      fetchImages(inputText,page);

    }
    else{
      imagesContainer.innerHTML=`<h2>Please enter search query.</h2>`;
      if(loadMoreButton.style.display ===  "block")
        {
          loadMoreButton.style.display="none";
        }
    }


});


loadMoreButton.addEventListener('click', ()=>{
  fetchImages(searchInput.value.trim(),++page);

})