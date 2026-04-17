import {Component} from 'react'
import {v4} from 'uuid'
import Tags from '../Tags'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    taskInput: '',
    tagInput: tagsList[0].optionId,
    taskList: [],
    activeId: 'INITIAL',
  }

  onChangeTask = e => {
    this.setState({
      taskInput: e.target.value,
    })
  }

  onChangeTags = e => {
    this.setState({tagInput: e.target.value})
  }

  onSumbitTask = e => {
    e.preventDefault()
    const {tagInput, taskList, taskInput} = this.state

    const selectTag = tagsList.find(each => each.optionId === tagInput)

    const newList = {
      id: v4(),
      task: taskInput,
      tag: selectTag.displayText,
      tagId: tagInput,
    }

    this.setState({
      taskList: [...taskList, newList],
      taskInput: '',
      tagInput: tagsList[0].optionId,
    })
  }

  onClickTags = id => {
    this.setState({
      activeId: id,
    })
  }

  renderCreateTaskView = () => {
    const {taskInput, tagInput} = this.state
    return (
      <div className='container-create-render'>
        <h1 className='create-heading'>Create a task!</h1>
        <form className='form-container' onSubmit={this.onSumbitTask}>
          <label htmlFor='Task' className='label-text'>
            Task
          </label>
          <input
            type='text'
            id='Task'
            className='input'
            value={taskInput}
            onChange={this.onChangeTask}
            placeholder='Enter the task here'
          />
          <label htmlFor='Tags' className='label-text'>
            Tags
          </label>
          <select
            className='input'
            id='Tags'
            value={tagInput}
            onChange={this.onChangeTags}
          >
            {tagsList.map(each => (
              <option key={each.optionId} value={each.optionId}>
                {each.displayText}
              </option>
            ))}
          </select>
          <button type='submit' className='add-task-button'>
            Add Task
          </button>
        </form>
      </div>
    )
  }

  renderTakesView = () => {
    const {taskList, activeId} = this.state
    const filterListTask =
      activeId === 'INITIAL'
        ? taskList
        : taskList.filter(each => each.tagId === activeId)
    return (
      <div className='tags-container'>
        <h1 className='tags-text'>Tags</h1>
        <ul className='list-tags-itms-container'>
          {tagsList.map(each => (
            <Tags
              key={each.optionId}
              textTags={each}
              isActive={each.optionId === activeId}
              onClickTags={this.onClickTags}
            />
          ))}
        </ul>
        <h1 className='tags-text'>Tasks</h1>
        <ul className='task-input-container'>
          {filterListTask.length > 0 ? (
            filterListTask.map(each => (
              <li key={each.id} className='list-itms-tasks'>
                <p className='task-list-text'>{each.task}</p>
                <p className='button-complted'>{each.tag}</p>
              </li>
            ))
          ) : (
            <div className='no-task-adding-add'>
              <p className='tags-text'>No Tasks Added Yet</p>
            </div>
          )}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className='resposive-container'>
        {this.renderCreateTaskView()}
        {this.renderTakesView()}
      </div>
    )
  }
}
export default MyTasks
