const makeName = (name, to) => { return [name, to].sort().join('_') }

const Subscription = {
    message: {
        subscribe: (parent, { from, to }, { PubSub }) => {
            const chatBoxName = makeName(from, to)
            return PubSub.subscribe(`chatBox ${chatBoxName}`)
        },
    },
}
  

export default Subscription