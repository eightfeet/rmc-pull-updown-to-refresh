##  rmc-pull-updown-to-refresh  
An accessible and easy component for ReactJS
### 简单易用的react拖拉翻页组件

##  Installing
npm  
```sh
    npm i rmc-pull-updown-to-refresh -S
```
yarn
```sh
yarn add rmc-pull-updown-to-refresh
```
##  Basic Example

##  API
- ### onPullDown: () => Promise<any>      
下拉事件
	 
- ### onPullUp: () => Promise<any>  
上拉事件  
 
- ### disablePullUp: boolean   
禁用上拉事件  
 
- ### disablePullDown: boolean   
禁用下拉事件   
 
- ### pullDownText: string    
下拉状态提示文案   

- ### pullUpText: string    
上拉状态提示文案   

## Event flow
<img src="https://github.com/eightfeet/rmc-pull-updown-to-refresh/blob/master/src/components/PullToRefresh/flow.png?raw=true" width="500" />

## Demo
<div align="center">
    <img src="https://github.com/eightfeet/rmc-pull-updown-to-refresh/blob/master/src/components/PullToRefresh/example.gif?raw=true" width="300" />
    <br /> 
    手机扫码体验   
    <br />   <img src="https://github.com/eightfeet/rmc-pull-updown-to-refresh/blob/master/src/components/PullToRefresh/demo.png?raw=true" width="100" />  
</div>
