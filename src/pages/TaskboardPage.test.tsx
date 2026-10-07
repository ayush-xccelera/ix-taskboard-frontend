import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TaskboardPage } from './TaskboardPage'

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <TaskboardPage />
    </MemoryRouter>,
  )
})
