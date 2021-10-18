


const $= document.querySelector.bind(document)
const $$= document.querySelectorAll.bind(document)


const playlistt = $('.playlist')
const random  = $('.btn-random')
const repeat = $('.btn-repeat')
const heading = document.querySelector('header h2')
const cdThumb = document.querySelector('.cd-thumb')
const  aaudio = document.querySelector('#audio')
const getCd= document.querySelector('.cd')
const progress = document.querySelector('.progress')
const next = $('.btn-next')
const prev = $('.btn-prev')


const playBtn= $(".btn-toggle-play")


const player = $('.player')
const app = {
   
  currentIndex: 0 ,
  isRandom : false,
  isPlaying: false, 

songs: [
{
 name : '0',
 singer: 'son tung m-tp',
 path :"./music/Em-Cua-Ngay-Hom-Qua-Slim-V-Remix-Son-Tung-M-TP.mp3",
 img: './img/maxresdefault.jpg'
},
{
 name : '1',
 singer: 'bạn có tài mà',
 path :"./music/Ghe-Qua-Dick-x-Tofu-x-PC.mp3",
 img: './img/maxresdefault.jpg'
},
{
 name : '2',
 singer: 'sontung mtp',
 path :"./music/Shape-Of-You-Cover-Niki-Nhi-Ha.mp3",
 img: './img/maxresdefault.jpg'   
},{
 name : '3',
 singer: 'son tung m-tp',
 path :"./music/Em-Cua-Ngay-Hom-Qua-Slim-V-Remix-Son-Tung-M-TP.mp3",
 img: './img/maxresdefault.jpg'
},
{
 name : '4',
 singer: 'bạn có tài mà',
 path :"./music/Ghe-Qua-Dick-x-Tofu-x-PC.mp3",
 img: './img/maxresdefault.jpg'
},
{
 name : '5',
 singer: 'sontung mtp',
 path :"./music/Shape-Of-You-Cover-Niki-Nhi-Ha.mp3",
 img: './img/maxresdefault.jpg'   
},{
  name : '6',
  singer: 'son tung m-tp',
  path :"./music/Em-Cua-Ngay-Hom-Qua-Slim-V-Remix-Son-Tung-M-TP.mp3",
  img: './img/maxresdefault.jpg'
 },
 {
  name : '7',
  singer: 'bạn có tài mà',
  path :"./music/Ghe-Qua-Dick-x-Tofu-x-PC.mp3",
  img: './img/maxresdefault.jpg'
 },
 {
  name : '8',
  singer: 'son tung m-tp',
  path :"./music/Em-Cua-Ngay-Hom-Qua-Slim-V-Remix-Son-Tung-M-TP.mp3",
  img: './img/maxresdefault.jpg'
 },
 
 {
  name : '9',
  singer: 'bạn có tài mà',
  path :"./music/Ghe-Qua-Dick-x-Tofu-x-PC.mp3",
  img: './img/maxresdefault.jpg'
 },
],
defineProperties : function(){
  Object.defineProperty( this, 'currentSong' , {
    get : function(){
      return this.songs[this.currentIndex]
    }
  })
},



 
  


loadCurrentSong : function(){
   heading.textContent=this.currentSong.name
   cdThumb.style.backgroundImage=`url(${this.currentSong.img})`
   aaudio.src= this.currentSong.path
},
  rende : function(){
      const htmls = this.songs.map(function(song , index){
            return`
            <div class="song  ${index === app.currentIndex ? 'active' : ''} data-index ="${index}"">
                <div class="thumb" style="background-image: url('${song.img}')">
           </div>
             <div class="body">
                 <h3 class="title">${song.name}</h3>
                 <p class="author">${song.singer}</p>
                 </div>
               <div class="option">
           <i class="fas fa-ellipsis-h"></i>
              </div>
                       </div>
            `
        
      })
    
      
     document.querySelector('.playlist').innerHTML= htmls.join('')
  },
    handle: function(){
     const _this = this 
    
      const cdthumbAnimate=  $('.cd-thumb').animate({
        transform : 'rotate(360deg)'
            
       }, {
        duration :10000,
        interations : Infinity
      }
      )
      cdthumbAnimate.pause()
   
     const getCd= $('.cd')
     const widthOfCd = getCd.offsetWidth
    
   document.onscroll= function(){
        const scrollTop = window.scrollY
        const newWidth = widthOfCd - scrollTop
     
        getCd.style.width = newWidth>0 ? newWidth + 'px':0 
        getCd.style.opacity = newWidth/widthOfCd 
       
       

   }    

    playBtn.onclick = function(){
         if(_this.isPlaying){
           
            audio.pause()
          
         }else{
          
          audio.play()
        
         }
        audio.onplay= function(){
          _this.isPlaying = true
          player.classList.add('playing')
          cdthumbAnimate.play()
        }
        audio.onpause= function(){
          _this.isPlaying = false
          cdthumbAnimate.pause()
          player.classList.remove('playing')
        }
      
    
    
      audio.ontimeupdate = function(){
          if (audio.duration){
             const  progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
             progress.value = progressPercent
          }
      }
       
          progress.onchange =function(e){
             const seekTime = e.target.value / 100 * audio.duration 
             audio.currentTime=seekTime
          }

          next.onclick = function(){
               if(_this.isRandom){
                 _this.playRandomSong()
               }else{
                _this.nextSong()
               }

               
               audio.play()
               _this.rende()
               _this.scrollActiveSong()
          }
          prev.onclick = function(){

            if(_this.isRandom){
                 _this.playRandomSong()
               }else{
                _this.prevSong()
               }
              
               audio.play()
               _this.rende()
               _this.scrollActiveSong()
              
          
          }
         

          random.onclick=function(){
            if (_this.isRandom){
              _this.isRandom= false;
              random.classList.remove('active')
            }else{
              _this.isRandom= true;
              random.classList.add('active')
            }
          }
           repeat.onclick= function(){
             if(_this.isRepeat){
              _this.isRepeat= false
              repeat.classList.remove('active')
             }else{
              _this.isRepeat= true
              repeat.classList.add('active')

             }
           }
          audio.onended =function(){
           if (_this.isRepeat){
               audio.play()
           }else{
            next.click()
           }
           
          }
     playlistt.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
          
          

     
  }
  
   
  },
     scrollActiveSong: function(){
          setTimeout(() => {
              $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block :'center'
              });
          }, 300);      
    },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.rende()
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  // playRandomSong : function(){
  //   let newIndex 
  //   do{
  //        newIndex= Math.floor(Math.random() * this.songs.length)
  //   }while(newIndex === this.currentIndex)
  //    this.currentIndex= newIndex
  //   this.loadCurrentSong()
  // },

   playRandomSong:function(){
      let newIndex 
      do {
         newIndex= Math.floor(Math.random()* this.songs.length)
      }while( newIndex === this.currentIndex)
      this.currentIndex = newIndex
      this.loadCurrentSong()

   },
  start: function(){
     this.rende()
     this.handle()
      this.defineProperties()
      this.loadCurrentSong()
     
  }

} 

app.start()
