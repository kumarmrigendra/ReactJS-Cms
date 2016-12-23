import React from 'react'; 
import { default as Posts } from './cards/posts';
import { default as PastLens } from './cards/pastLens';
import { default as Projections } from './cards/projections';
import { default as Promote } from './cards/promote';
import { default as Latest } from './cards/latest';
import { default as ScoreCard } from './cards/scoreCard';
import { default as SocialFeed } from './cards/socialFeed';
import { default as Bookmark } from './cards/bookmark';
import dashboardServices from './../services/';
var ReactGridLayout = require('react-grid-layout');

const originalLayout = getFromLS('layout') || [];

export default React.createClass({
    getInitialState: function(){
        return {
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            cols: 12,
            rowHeight: 30,
            dashboardConfigState: false,
            bookmark: []

        }
    }, 
    onLayoutChange(layout) { 
        saveToLS('layout', layout);
        this.setState({layout});
        // console.log(this.props);
        // this.props.onLayoutChange(layout); // updates status display

    },
    handleResize(e) {
        let inWidth = window.innerWidth;
        let cols = 0;
        cols = window.innerWidth > 996 ? 12 : (window.innerWidth > 768 ? 10 : (window.innerWidth > 480 ? 6 : 4));
        this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
        cols: cols
        });
        // console.log(this.state.cols, this.state.windowWidth);
    },
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        // console.log(this.props);
        if(this.state.dashboardConfigState === false) {
            this.createDashboardConfig(); 
        };
        this.editDashboardConfig();
        this.getBookmarkFromLS(); 
        // this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
        // console.log(this.state);
    },
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    },
    routerWillLeave(nextLocation) {
        // console.log('leaving');
    },
    createDashboardConfig(){
        var self = this;
        let layout = getFromLS('layout');
        dashboardServices.createDashboard({data: {layout}}, function(err, res){
            // console.log('createDashboardConfig', res);
            if(res.status===-1){
                self.setState({
                    dashboardConfigState: true,
                });
            }
        });
    },
    editDashboardConfig(){
        // console.log('enter');
        let layout = getFromLS('layout');
        setInterval(function(){
            dashboardServices.editDashboard({data: {layout}}, function(err, res){
                // console.log('editDashboardConfig', res);
                // saveToLS('layout', layout);
            });
        }, 5000);
        
    },
    removeDC(){
        // console.log('enter remove dc');
        dashboardServices.invalidateDashboard({}, function(err, res){
            // console.log(res);
        });
    },
    componentWillMount(){
        dashboardServices.getDashboard({}, function(err, res){
            // console.log(res);
            // onLayoutChange(res.data.layout);
        });
    },
    getBookmarkFromLS(){
        let bookmark = [];
        bookmark  = JSON.parse(global.localStorage.getItem('bookmark')) || [];
        this.setState({bookmark});
    },
    render() { 
        if (!this.props.user){
            return <div></div>;
        }
        console.log(this.state.bookmark);  
        return (
                <ReactGridLayout ref="rgl" className="layout" cols={this.state.cols} onLayoutChange={this.onLayoutChange} rowHeight={30} width={this.state.windowWidth} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}>
                    {   this.state.bookmark.map((item, i)=>
                            <div className="db-card" key={i} id={item} data-grid={{x: 0, y: 0, w: 3, h: 3, minW: 3, maxW: 3}}><Bookmark articleid = {item} /></div>    
                        )
                    }
                    <div className="db-card" key="a" data-grid={{x: 0, y: 0, w: 3, h: 10, minW: 3, maxW: 3}}><Posts /></div>
                    <div className="db-card" key="b" data-grid={{x: 3, y: 0, w: 3, h: 10, minW: 3, maxW: 3}}><PastLens /></div>
                    <div className="db-card" key="c" data-grid={{x: 6, y: 0, w: 3, h: 10, minW: 3, maxW: 3}}><Projections /></div>
                    <div className="db-card" key="d" data-grid={{x: 0, y: 2, w: 3, h: 10, minW: 3, maxW: 3}}><Latest /></div>
                    <div className="db-card" key="e" data-grid={{x: 3, y: 2, w: 3, h: 10, minW: 3, maxW: 3}}><Promote /></div>
                    <div className="db-card" key="f" data-grid={{x: 6, y: 2, w: 3, h: 10, minW: 3, maxW: 3}}><ScoreCard /></div>
                    <div className="db-card" key="g" data-grid={{x: 9, y: 0, w: 3, h: 30, static: true}}><SocialFeed /></div>
                    
                </ReactGridLayout>
                
        )
    }
});

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-7')) || {};
    } catch(e) {/*Ignore*/}
  }
  return ls[key];
}

function saveToLS(key, value) {
    console.log(key, value);
  if (global.localStorage) {
    global.localStorage.setItem('rgl-7', JSON.stringify({
      [key]: value
    }));
  }
}

        // <div className="db-card" key="h" data-grid={{x: 0, y: 4, w: 3, h: 10, static: true}}><p onClick={this.removeDC}> ttt
        // </p>
        // </div>

//cols={{lg: 12, md: 10, sm: 6, xs: 4}}