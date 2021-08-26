import { useContext } from 'react'
import _ from 'lodash'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import { makeStyles } from '@material-ui/core'
import EntryView from '../components/EntryView'
import { searchItems } from '../lib/utils'

const useStyles = makeStyles({
  viewArea: {
    maxWidth: 850,
    margin: '0 auto',
  },
})

const FavoriteView = () => {
  const classes = useStyles()
  const { user } = useContext(UserContext)
  const { contacts, keywords, ageRange } = user

  const isSearching = !_.isEmpty(keywords) || !_.isEmpty(ageRange.ranges)

  const favorites = _.filter(contacts, 'liked')

  const items = searchItems(
    favorites,
    keywords,
    ageRange.ranges,
    ageRange.isLessThan
  )

  return (
    <Layout title='お気に入りリスト'>
      <div className={classes.viewArea}>
        {isSearching && (
          <p>
            {items.length}件/
            {favorites.length}件のヒット
          </p>
        )}

        {!_.isEmpty(favorites) ? (
          (isSearching ? items : favorites).map(
            (favorite: Entry, i: number) => (
              <EntryView key={i} entry={favorite} />
            )
          )
        ) : (
          <p>連絡先が登録されていません。</p>
        )}
      </div>
    </Layout>
  )
}

export default FavoriteView
