<script>

export default {
    data() {
        return {
            map: null
        }
    },
    methods: {
        search() {
            // console.log(event.target.value);
            var options = {
		onSearchComplete: function(results){
			// 判断状态是否正确
			if (local.getStatus() == BMAP_STATUS_SUCCESS){
				var s = [];
				for (var i = 0; i < results.getCurrentNumPois(); i ++){
					s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
				}
				document.getElementById("r-result").innerHTML = s.join("<br/>");
			    }
		    }
	    };
	    var local = new BMapGL.LocalSearch(this.map, options);
	    local.search(event.target.value);
        }
    },
    mounted() {
        this.map = new BMapGL.Map("container");          // 创建地图实例 
        var point = new BMapGL.Point(118.908768,31.644353);  // 创建点坐标 
        this.map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

        // map.setHeading(64.5);   //设置地图旋转角度
        // map.setTilt(73);       //设置地图的倾斜角度

        // map.setMapType(BMAP_EARTH_MAP);      // 设置地图类型为地球模式
        //         地图类型常量：
        // 1.标准地图：BMAP_NORMAL_MAP
        // 2.地球模式：BMAP_EARTH_MAP
        // 3.普通卫星地图：BMAP_SATELLITE_MAP


        var scaleCtrl = new BMapGL.ScaleControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT
        });  // 添加比例尺控件
        this.map.addControl(scaleCtrl);
        var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
        this.map.addControl(zoomCtrl);
        var cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
        this.map.addControl(cityCtrl);

        // 更改地图模式
        // map.setMapStyleV2({     
        //     styleId: 'a8aaa75ef18d7c0559383d3552fedcf9'
        // });

         
        var marker = new BMapGL.Marker(point);        // 创建标注   
        this.map.addOverlay(marker);                  // 将标注添加到地图中

        var polyline = new BMapGL.Polyline([
		new BMapGL.Point(116.399, 39.910),
		new BMapGL.Point(116.405, 39.920),
		new BMapGL.Point(116.425, 39.900)
	        ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
            this.map.addOverlay(polyline);


        // var geolocation = new BMapGL.Geolocation();

        // const _this = this
        // geolocation.getCurrentPosition(function(r){
        //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
        //         var mk = new BMapGL.Marker(r.point);
        //         _this.map.addOverlay(mk);
        //         _this.map.panTo(r.point);

                
	

        //         alert('您的位置：' + r.point.lng + ',' + r.point.lat);
        //     }
        //     else {
        //         alert('failed' + this.getStatus());
        //     }        
        // });

    }
}

</script>

<template>
    <h3>
        地图搜索：<input type="text" @keyup.enter="search" />
    </h3>
    <div id="container"></div> 
    <section id="r-result" ></section>
</template>

<style lang="scss" scoped>
#container {
    height: 500px;

}
</style>