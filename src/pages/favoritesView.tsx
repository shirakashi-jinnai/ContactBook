import Layout from '../components/Layout'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import EntriesView from '../components/entriesView'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  viewArea: {
    maxWidth: 850,
    margin: '0 auto',
  },
})

const FavoriteView = () => {
  const classes = useStyles()
  const { user } = useContext(UserContext)
  return (
    <Layout title='お気に入りリスト'>
      <div className={classes.viewArea}>
        {user.favorites.length ? (
          user.favorites.map((favorite: Entry) => (
            <EntriesView
              firstName={favorite.firstName}
              lastName={favorite.lastName}
              id={favorite.id}
              liked={favorite.liked}
            />
          ))
        ) : (
          <p>お気に入りが登録されていません。</p>
        )}
      </div>
    </Layout>
  )
}

export default FavoriteView
