/**
 * Created by HUCC on 2017/11/11.
 */

//区域滚动功能
mui(".mui-scroll-wrapper").scroll({
    indicators:false
  });
  
  
  //轮播图自动播放功能
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });