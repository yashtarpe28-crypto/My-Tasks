import './index.css'

const Tags = props => {
  const {textTags, isActive, onClickTags} = props
  const {displayText, optionId} = textTags
  const classNameButton = isActive ? 'bold-button' : 'tags-button'
  const onClickTagsButton = () => {
    onClickTags(optionId)
  }

  return (
    <li className="list-tags-items">
      <button
        type="button"
        className={classNameButton}
        onClick={onClickTagsButton}
      >
        {displayText}
      </button>
    </li>
  )
}
export default Tags
