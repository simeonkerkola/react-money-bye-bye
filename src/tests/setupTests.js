import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DotEnv from 'dotenv'

// Configuring Enzyme to have support for React 16
Enzyme.configure({
  adapter: new Adapter(),
})

DotEnv.config({ path: '.env.test' })
