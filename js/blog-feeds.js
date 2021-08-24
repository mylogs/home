window.addEventListener('load',function(){
      var _feeds=0
      function defer_feed(){
        if(_feeds==0){
          _feeds=1
          var cate=$('.feed-entry')
          if(cate.length!=''){
            $(cate).each(function(i){
              var r=Number($(cate[i]).attr('data-item')),
              attr=$(cate[i]).attr('data-category'),
              cate_id=$(cate[i]).attr('data-id'),
              cate_type=$(cate[i]).attr('data-type')
              if(typeof attr!==typeof undefined&&attr!==false)var cate_name=$(cate[i]).attr('data-category')
              if(cate_type=='new posts')var cate_url=''
              else if(cate_type=='label posts')cate_url='https://www.blogger.com/feeds/'+cate_id+'/posts/default/-/'+cate_name
              else if(cate_type=='recent posts')cate_url='https://www.blogger.com/feeds/'+cate_id+'/posts/default'
              else if(cate_type=='random posts')cate_url='https://www.blogger.com/feeds/'+cate_id+'/posts/summary?alt=json-in-script&max-results=0'
              else if(cate_type=='related posts')cate_url='https://www.blogger.com/feeds/'+cate_id+'/posts/summary/-/'+cate_name+'?alt=json-in-script&max-results=0'
              function feed_entry(e){
                if(e.feed.entry){
                  for(var t=0;t<e.feed.entry.length;t++){
                    var entry=e.feed.entry[t]
                    for(var a=0;a<entry.link.length;a++){
                      if(entry.link[a].rel=='alternate'){
                        if(data.view.isMobile=='true')var entry_url=entry.link[a].href+'?m=1'
                        else entry_url=entry.link[a].href
                        break
                      }
                    }
                    var entry_title=entry.title.$t
                    if('media$thumbnail' in entry){
                      var entry_thumb=entry.media$thumbnail.url.replace('s72-c','s1600'),
                      _img='<a class="img has--img" href='+entry_url+' rel="noopener" target="_blank" title="'+entry_title+'"><img alt="'+entry_title+'" class="lazyload" data-src='+entry_thumb+' src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="></a>'
                    }else{
                      var st=entry.content.$t,at=st.indexOf("<img"),bt=st.indexOf('src="',at),
                        ct=st.indexOf('"',bt+5),dt=st.substr(bt+5,ct-bt-5)
                      if(at!=-1&&bt!=-1&&ct!=-1&&dt!="")_img='<a class="img has--img" href='+entry_url+' rel="noopener" target="_blank" title="'+entry_title+'"><img alt="'+entry_title+'" class="lazyload" data-src='+dt+' src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="></a>'
                      else _img='<a class="img no--img" href='+entry_url+' rel="noopener" target="_blank" title="'+entry_title+'"></a>'
                    }
                    if('author' in entry){
                      for (var z=0;z<entry.author.length;z++){
                        var entry_author_name=entry.author[z].name.$t,
                          entry_author_image=entry.author[z].gd$image.src
                        if(entry.author[z].uri)var entry_author_uri=entry.author[z].uri.$t
                        else entry_author_uri='javascript:void(0)'
                      }
                    }
                    var card_header=''
                    if('category' in entry){
                      var listlabel=''
                      for(var k=0;k<entry.category.length;k++){
                        listlabel+=entry.category[k].term
                        var video=data.category.video,
                        photo=data.category.photo,
                        _video=listlabel.indexOf(video),
                        _photo=listlabel.indexOf(photo),
                        video_label=listlabel.slice(_video,Number(_video)+video.length),
                        photo_label=listlabel.slice(_photo,Number(_photo)+photo.length)
                        if(video==video_label)card_header='<div class="card-header thumbnail_icon thumbnail_video">'+_img+'</div>'
                        else if(photo==photo_label)card_header='<div class="card-header thumbnail_icon thumbnail_photo">'+_img+'</div>'
                        else card_header='<div class="card-header">'+_img+'</div>'
                      }
                    }else{card_header='<div class="card-header">'+_img+'</div>'}
                    var entry_published=entry.published.$t.substring(8,10)+' thg '+entry.published.$t.substring(5,7)+', '+entry.published.$t.substring(0,4)
                    if('content' in entry){
                      var post_snippet=entry.content.$t,
                        snippets=100,summary='',re=/<\S[^>]*>/g,
                        post_snippet = post_snippet.replace(re,"")
                      if(post_snippet.length<snippets){
                        summary=post_snippet
                      }else{
                        post_snippet=post_snippet.substring(0, snippets)
                        var quoteEnd=post_snippet.lastIndexOf(' '),
                          entry_summary=post_snippet.substring(0,quoteEnd)
                      }
                    }else{entry_summary=''}
                    if('thr$total' in entry)var entry_comments=entry.thr$total.$t
                    else entry_comments=0
                    var _title='<div class="title"><a href='+entry_url+' rel="noopener" target="_blank" title="'+entry_title+'">'+entry_title+'</a></div>',
                    _published='<span class="date">'+entry_published+'</span>',
                    _comments='<span class="cmt-num" data-num-comments='+entry_comments+'><a href="'+entry_url+'#comments" rel="noopener" target="_blank" title="'+data.messages.postAComment+'">'+entry_comments+' '+data.messages.comments+'</a></span>',
                    _author='<div class="label-wrapper"><a href='+entry_author_uri+' rel="noopener" target="_blank" title="'+entry_author_name+'"><img alt="'+entry_author_name+'" src='+entry_author_image+'><span>'+entry_author_name+'</span></a></div>',
                    _summary='<div class="post-entry"><p>'+entry_summary+'</p></div>',
                    _share='<span aria-label="'+data.messages.share+'" class="share flex align-center has-hover has-svg-icon" title="'+data.messages.share+'" role="button" tabindex="0"></span>',
                    _meta='<div class="meta flex align-center">'+_published+_comments+_share+'</div>',
                    card_content='<div class="card-content">'+_title+_meta+_summary+'</div>',
                    _more='<div class="button-wrapper"><a aial-label="'+data.messages.readMore+'" class="theme-button" href="'+entry_url+'#more" rel="noopener" target="_blank" title="'+data.messages.readMore+'">'+data.messages.readMore+'</a></div>',
                    card_footer='<div class="card-footer">'+_author+_more+'</div>',
                    html='<div class="col-md-4"><article class="card">'+card_header+card_content+card_footer+'</article></div>'            
                    $(cate[i]).find('.spinner').removeClass('spinner')
                    $(cate[i]).find('.widget-content').append(html)
                  }
                }
              }
              $(cate[i]).off('click','.card-content .share').on('click','.card-content .share',function(e){
                e.preventDefault()
                var $this=$(this).parents('.card'),
                _url=$this.find('.card-content .title a').attr('href'),
                _thumb=$this.find('img').attr('data-src'),
                _sum=$this.find('.card-content p').text(),
                _fb='https://www.facebook.com/sharer.php?u='+_url,
                _tw='https://twitter.com/intent/tweet?url='+_url+'&text='+_sum,
                _pi='https://www.pinterest.com/pin/create/button/?url='+_url+'&description='+_sum+'&media='+_thumb,
                _li='https://www.linkedin.com/sharing/share-offsite/?url='+_url,
                _modal_content='<div class="modal--confirm"><div class="modal--dialog"><div class="_3em"></div><div class="modal--content" tabindex="0"><div class="modal--header"><div class="_mht">'+data.messages.shareheader+'</div><div arial-label="close" class="_mhc modal--icon has-svg-icon has-hover modal--close" role="button" tabindex="0"></div></div><div class="modal--body"><div><ul class="dd-menu"><li><span class="copy has-hover has-svg-icon" tabindex="0">'+data.messages.copy+'</span></li><li><span class="social-wrapper has-hover has-svg-icon fb" data-href='+_fb+' tabindex="0">'+data.messages.facebook+'</span></li><li><span class="social-wrapper has-hover has-svg-icon tw" data-href="'+_tw+'" tabindex="0">'+data.messages.twitter+'</span></li><li><span class="social-wrapper has-hover has-svg-icon pi" data-href="'+_pi+'" tabindex="0">'+data.messages.pinterest+'</span></li><li><span class="social-wrapper has-hover has-svg-icon li" data-href='+_li+' tabindex="0">'+data.messages.linkedin+'</span></li></ul></div></div><div class="modal--footer"><button aria-label="close" class="primary has-hover modal--close" type="button">'+data.messages.close+'</button></div></div><div class="_3em"></div></div></div>'
                  $(_modal_content).appendTo('body')
                  $('.modal--confirm').fadeIn('slow',function(){$(this).addClass('show')})
                  $('.modal--close').click(function(){
                    $('.modal--confirm').removeClass('show')
                    setTimeout(function(){$('.modal--confirm').remove()},200)
                  })
                  var a=document.getElementsByClassName('social-wrapper'),o=a.length
                  for(i=0;i<o;i++)a[i].addEventListener('click',function(t,e,a){
                    t=this.getAttribute('data-href')
                    var o=screen.width/2-200,n=screen.height/2-225;
                    window.open(t,"popUpWindow","height=450,width=400,left="+o+",top="+n+ ",resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes")
                  })
                  function copyLinkToClipboard(e){
                    var t=document.createElement('textarea')
                    t.value=e,document.body.appendChild(t),t.select()
                    try{document.execCommand('copy')
                    }catch(o){alert("!!!")}
                    document.body.removeChild(t)
                  }
                  $('.copy').click(function(){
                    copyLinkToClipboard(_url)
                    $('body').append('<div class="modals"><div class="modals-dialog"><div class="modals-dialog-content flex align-center">'+ data.messages.linkCopiedToClipboard +' <svg class="modals-dialog-buttons" height="21px" width="21px" viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg></div></div></div>')
                  setTimeout(function(){$('.modals').remove()},4000)
                  $('.modals-dialog-buttons').click(function(){$(this).parents('.modals').remove()})
                })
              })
              if(cate_type=='new posts'){
                cate_id=cate_id.split(',')
                cate_id.forEach(function(m,n){
                   $.ajax({
                    type:'GET',
                    url:'https://www.blogger.com/feeds/'+m+'/posts/default',
                    data:{'alt':'json','max-results':1},
                    dataType:'jsonp',
                    success:feed_entry
                  })                  
                })
              }else if(cate_type=='random posts'){
                $.get(cate_url,function(data){
                  if(data.feed){
                    var a=data.feed.openSearch$totalResults.$t
                    if(a<r)r=a
                    let arr=[]
                    do{
                      let num=Math.floor(Math.random()*a)
                      arr.push(num)
                      arr=arr.filter((item,index)=>{return arr.indexOf(item)===index})
                    }while(arr.length<r)
                    arr.forEach(function(m){
                      m+=1
                      $.ajax({
                        type:'GET',
                        url:'https://www.blogger.com/feeds/'+cate_id+'/posts/default',
                        data:{'alt':'json','start-index':m,'max-results':1},
                        dataType:'jsonp',
                        success:feed_entry
                      })
                    })
                  }
                },'jsonp')
              }else if(cate_type=='related posts'){ 
                $.get(cate_url,function(data){
                  if(data.feed){
                    var a=data.feed.openSearch$totalResults.$t
                    if(a<r)r=a
                    let arr=[]
                    do{
                      let num=Math.floor(Math.random()*a)
                      arr.push(num)
                      arr=arr.filter((item,index)=>{return arr.indexOf(item)===index})
                    }while(arr.length<r)
                    arr.forEach(function(m){
                      m+=1
                      $.ajax({
                        type:'GET',
                        url:'https://www.blogger.com/feeds/'+cate_id+'/posts/default/-/'+cate_name,
                        data:{'alt':'json','start-index':m,'max-results':1},
                        dataType:'jsonp',
                        success:feed_entry
                      })
                    })
                  }
                },'jsonp')
              }else{
                $.ajax({
                  type:'GET',
                  url:cate_url,
                  data:{'alt':'json','max-results':r},
                  dataType:'jsonp',
                  success:feed_entry
                })
              }
            })
          }
        }
      }
      window.addEventListener('scroll',function(){defer_feed()})
      window.addEventListener('mousemove',function(){defer_feed()})
      setTimeout(function(){defer_feed()},1000)
      var tar=$('.menu .html a[href*="#"]').not('.menu .html a[href="#"]').not('.menu .html a[href="#0"]'),
        ent=$('.feed-entry')
      $(tar).each(function(i){
        if(url.indexOf($(tar[i]).attr('href'))!=-1){
          var target=$(tar[i]).attr('href').replace('#','')
          $(ent).each(function(k){
            var id=$(ent[k]).attr('id')
            if(target==id)$('html,body').animate({scrollTop:$('#'+id).offset().top-($('header').height()+15)},1000)
          })
        }
      })
      $(tar).on('click',function(event){
        if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){
          var target=$(this.hash)
          target=target.length?target:$('[name='+this.hash.slice(1)+']')
          if(target.length)$('html,body').animate({scrollTop:target.offset().top-($('header').height()+15)},1000)
        }
      })
      $(window).scroll(function(){
        $(ent).each(function(i){
          var $this=$(this)
          if($this.position().top<=$(window).scrollTop()+$('header').height()+15){
            $(tar).parent().removeClass('active')
            $(tar).eq(i).parent().addClass('active')  
          }else{$(tar).eq(i).parent().removeClass('active')}
        })
      })
    })
