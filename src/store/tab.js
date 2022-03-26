import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menu:[]
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //选择标签 选择面包屑
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result === -1 ? state.tabsList.push(val) : ''
                //Cookie.set('tagList', JSON.stringify(state.tabsList))
            } else {
                state.currentMenu = null
            }
            // val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
        },
        //关闭标签
        closeTag(state, val) {
            let result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
            //Cookie.set('tagList', JSON.stringify(state.tabsList))
        },
        setMenu(state,val){
            state.menu=val
            Cookie.set('menu',JSON.stringify(val))
        },
        clearMenu(state){
            state.menu=[]
            Cookie.remove('menu')
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return
            }
            
            //取出cookie数据，给vuex
            let menu=JSON.parse(Cookie.get('menu'))
            state.menu=menu
            //添加动态路由，主路由为Main.vue
            let currentMenu=[
                {
                    path: '/',
                    component:()=>import(`@/views/Main`),
                    children:[]
                }
            ]
            //如果是一级菜单，那么菜单名称肯定有路由，如果是二级菜单那么以及没有 二级有路由
            menu.forEach(item => {
                if (item.children) {
                  item.children = item.children.map(item => {
                    item.component = () => import(`@/views/${item.url}`)
                    return item
                  })
                  currentMenu[0].children.push(...item.children)
                } else {
                  item.component = () => import(`@/views/${item.url}`)
                  currentMenu[0].children.push(item)
                }
              })
            //添加动态路由
            router.addRoutes(currentMenu)
        }
    }
}