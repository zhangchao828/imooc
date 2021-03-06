import React,{PropTypes,Component} from 'react';
import styles from './home.scss';
import Card from '../Util/Card';
class Home extends Component {
    render() {
        const Item=Card.Item;
        const list=[{
            title:'ReactJs'
        },{
            title:'VueJs'
        },{
            title:'AngularJs'
        },{
            title:'webpack'
        },{
            title:'flex布局'
        },{
            title:'Redux管理数据流'
        },{
            title:'ES6'
        }];
        let items=list.map((item,i)=>{
            return(
                <div key={i} className={styles.card}>
                    <Card>
                        <Item position="top">
                            <span>{item.title}</span>
                        </Item>
                    </Card>
                </div>
            )
        })
        return (
           <div>
               <header className={styles.header}>
                   <h2>资源</h2>
               </header>
              <div className={styles.container}>
                  <div className={styles.wrap}>
                      {items}
                  </div>
              </div>
           </div>
        )
    }
}
export default Home;