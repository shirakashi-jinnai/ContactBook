import { useContext } from 'react'
import _ from 'lodash'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import { makeStyles } from '@material-ui/core'
import EntryView from '../components/EntryView'

const useStyles = makeStyles({
  viewArea: {
    maxWidth: 850,
    margin: '0 auto',
  },
})

const FavoriteView = () => {
  const classes = useStyles()
  const { user } = useContext(UserContext)
  const favorites = _.filter(user.contacts, 'liked')
  return (
    <Layout title='お気に入りリスト'>
      <div className={classes.viewArea}>
        {!_.isEmpty(favorites) ? (
          favorites.map((favorite: Entry, i: number) => (
            <EntryView key={i} entry={favorite} />
          ))
        ) : (
          <p>お気に入りが登録されていません。</p>
        )}
      </div>
    </Layout>
  )
}

export default FavoriteView
