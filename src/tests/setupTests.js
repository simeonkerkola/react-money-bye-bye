import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Configuring Enzyme to have support for React 16
Enzyme.configure({
  adapter: new Adapter(),
})
