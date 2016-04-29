import React,{PropTypes,Component} from 'react';
import {RoutePrize} from '../components/fit/prize';
import {withRouter} from 'react-router';
@withRouter
class Prize extends Component {
    //static contextTypes={
    //    /*
    //    要想在当前组件类访问context中的属性必须像这样
    //    先在contextTypes中显示声明该属性的PropTypes类型
    //    另外还有childContextTypes和getChildContext，
    //    使得当前组件下的子组件能通过context拿到相应组件
    //     */
    //    router: PropTypes.object.isRequired
    //};
    //componentWillMount() {
    //    除了通过context凡是获取router之外现在还可以通过withRouter高阶函数来获取(更方便)
    //    this.context.router.setRouteLeaveHook(
    //        this.props.route,
    //        this.routerWillLeave
    //    )
    //}
    componentWillMount(){
        this.props.router.setRouteLeaveHook(
            this.props.route,
            nextLocation=>this.routerWillLeave(nextLocation)
        )
    }
    routerWillLeave(nextLocation) {
        console.log(nextLocation);
        return true;
    }

    render() {
        return (
            <RoutePrize/>
        )
    }
}
export default Prize;