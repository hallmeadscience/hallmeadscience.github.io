var Diagram = {
	settings: {totalCollected:0},
	
	setup: function(data, container){
		//console.log('setup');
		
		Diagram.settings.data = data;
		Diagram.settings.mobileThreshold = data.mobileThreshold;
		Diagram.settings.container = container;
		
		var titleContainer = document.createElement('div');
		$(titleContainer).addClass('title-container');
		$(titleContainer).html('<span>'+data.title+'</span>');
		$(titleContainer).appendTo(container)
		
		var screen = document.createElement('div');
		$(screen).addClass('screen');
		$(screen).appendTo(container)
		
		var screenContent = document.createElement('div');
		$(screenContent).addClass('screen-content');
		$(screenContent).appendTo(screen);
		
		var popup = document.createElement('div');
		$(popup).addClass('popup');
		$(popup).appendTo(screenContent);
		$(popup).hide();
		
		var popupContent = document.createElement('div');
		$(popupContent).addClass('popup-content');
		$(popupContent).appendTo(popup);
		
		var popupText = document.createElement('div');
		$(popupText).addClass('popup-text');
		$(popupText).appendTo(popupContent);
		
		var closeButton = document.createElement('div');
		$(closeButton).addClass('close-button');
		$(closeButton).html('close');
		$(closeButton).appendTo(popup);
		$(closeButton).click(function(evt){Diagram.closePopup(evt)});
		
		Diagram.settings.popup = popup;
		
		itemContainer = document.createElement('div');
		$(itemContainer).addClass('item-container');
		$(itemContainer).appendTo(screenContent);
		
		var totalItems = 0;
		for(key in data.items){
			totalItems ++;
		}
		
		var legendArray = new Array();
		
		Diagram.settings.totalItems = totalItems;
		for(itemNum = 1; itemNum < totalItems+1; itemNum ++){
			//console.log('\n Diagram Item '+itemNum);
			var itemData = data.items['item'+itemNum];
			var item = document.createElement('div');
			$(item).addClass('item');
			if(itemData.process == true){
				$(item).addClass('process');
				var inArray = false;
				$(legendArray).each(function(index){
					//console.log(this.title);
					//console.log(itemData.title);
					if(this.title == itemData.title){
						inArray = true;
					}
				});
				if(!inArray){
					legendArray.push(itemData);
				}
			}
			$(item).attr('id', 'item'+itemNum);
			$(item).appendTo(itemContainer);
			
			var labelContainer =document.createElement('div');
			$(labelContainer).addClass('item-label-container');
			$(labelContainer).appendTo(item);
			
			var iconContainer = document.createElement('div');
			$(iconContainer).addClass('icon-container');
			$(iconContainer).appendTo(labelContainer);
			
			var icon = document.createElement('img');
			$(icon).addClass('icon');
			$(icon).attr('src', itemData.icon);
			
			$(icon).appendTo(iconContainer);
			
			var itemLabel = document.createElement('span');
			$(itemLabel).addClass('item-label');
			$(itemLabel).html(itemData.title);
			$(itemLabel).appendTo(labelContainer);
			
			var itemContent = $(popup).clone();
			$(itemContent).find('.popup-text').html(itemData.description);
			$(itemContent).appendTo(item);
			
			$(itemContent).find('.close-button').click(function(evt){Diagram.closePopup(evt);})
			
			$(itemContent).find('.rock-collection-button').click(function(evt){Diagram.addItem(evt)});
			
			(function(i){
				$((labelContainer)).click(function(evt){Diagram.itemHandler(evt, i)});
			}(itemNum));
		}
		
		Diagram.settings.legendArray = legendArray;
		var legendContainer = document.createElement('div');
		$(legendContainer).addClass('legend');
		$(legendContainer).appendTo(screenContent);
		//console.log('legendArray = '+legendArray);
		for(lNum = 0; lNum < legendArray.length; lNum++){
			var legendItem = document.createElement('div');
			$(legendItem).addClass('legend-item');
			var labelContainer = document.createElement('div');
			$(labelContainer).addClass('label-container');
			$(labelContainer).appendTo(legendItem);
			var iconContainer = document.createElement('div');
			$(iconContainer).addClass('icon-container');
			$(iconContainer).appendTo(labelContainer);
			var icon = document.createElement('img');
			$(icon).attr('src', legendArray[lNum].icon);
			$(icon).addClass('icon');
			$(icon).appendTo(iconContainer);
			var label = document.createElement('span');
			$(label).addClass('label');
			$(label).html(legendArray[lNum].title);
			$(label).appendTo(labelContainer);
			$(legendItem).appendTo(legendContainer);
			(function(l){
				$(legendItem).click(function(evt){Diagram.legendItemHandler(evt, l)});
			}(lNum));
			
		}
		
		var doneBtn = document.createElement('button');
		$(doneBtn).addClass('diagram-button');
		$(doneBtn).addClass('done-button');
		$(doneBtn).html('Done');
		$(doneBtn).appendTo(screen);
		$(doneBtn).bind('click', function(evt){window.location.assign(Diagram.settings.data.done.link)});
		
		$(window).resize(function(){Diagram.checkSize()});
		Diagram.checkSize();
	},
	
	itemHandler:function(evt, itemNum){
		//console.log('itemHandler '+itemNum);
		var tarItem = $(Diagram.settings.container).find('#item'+itemNum);
		Diagram.settings.curItem = itemNum;
		
		var itemData = Diagram.settings.data.items['item'+Diagram.settings.curItem];
		$(Diagram.settings.popup).find('.popup-text').html(itemData.description);
		if(!Diagram.settings.useMobile){
			if($(Diagram.settings.container).find('.open').length > 0){
				$(Diagram.settings.container).find('.open').find('.popup').hide();
				$(Diagram.settings.container).find('.open').removeClass('open');
			}
			if(tarItem.hasClass('process')){
				
				$(Diagram.settings.popup).fadeIn();
				Diagram.settings.activePopup = true;
			}else{
				if(window.innerWidth < 660){
					$(Diagram.settings.popup).fadeIn();
					Diagram.settings.activePopup = true;
				}else{
					$(tarItem).find('.popup').fadeIn();
				}
			}
			$(tarItem).addClass('open');
		}else{
			$(Diagram.settings.popup).fadeIn();
			Diagram.settings.activePopup = true;
			$('body, html').animate({'scrollTop': $(Diagram.settings.popup).offset().top});
		}
	},
	
	legendItemHandler: function(evt, lIndex){
		//console.log('legendItemHandler '+lIndex);
		itemData = Diagram.settings.legendArray[lIndex];
		var popup = $(Diagram.settings.popup);
		popup.find('.popup-text').html(itemData.description);
		popup.fadeIn();
		Diagram.settings.activePopup = true;
		$('body, html').animate({'scrollTop': $(Diagram.settings.popup).offset().top});
	},
	
	closePopup:function(evt){
		//console.log('closePopup');
		$(Diagram.settings.container).find('.open').find('.popup').hide();
		$(Diagram.settings.container).find('.open').removeClass('open');
		if(Diagram.settings.activePopup){
			$(Diagram.settings.popup).hide();
			$(Diagram.settings.popup).find('.popup-text').html('');
			Diagram.settings.activePopup = false;
		}
	},
	
	checkSize:function(){
		if(window.innerWidth <= Diagram.settings.mobileThreshold && !Diagram.settings.useMobile){
			Diagram.settings.useMobile = true;
		}else if(window.innerWidth > Diagram.settings.mobileThreshold && Diagram.settings.useMobile){
			Diagram.settings.useMobile = false;
		}
		
		if(window.innerWidth > Diagram.settings.mobileThreshold && Diagram.settings.activePopup && $(Diagram.settings.container).find('.open').length > 0){
			
		}
	}
}

$(document).ready(function(){Diagram.setup(_data, $('#rock-cycle-diagram'))});