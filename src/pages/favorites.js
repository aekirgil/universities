import React, { useEffect, useState } from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { addToFavorite, getFavorites, removeFromFavorite } from '.'
import clsx from 'clsx'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const favs = getFavorites()
    setFavorites(favs)
  }, [])

  const favorite = (university) => {
    if (favorites.includes(university)) {
      removeFromFavorite(university)
      setFavorites((old) => old.filter((item) => item !== university))
    } else {
      addToFavorite(university)
      setFavorites((old) => [...old, university])
    }
  }

  const isFavorite = (school) => {
    return favorites.find(
      (item) =>
        item.university === school.university &&
        item.department === school.department
    )
  }

  return (
    <>
      {favorites.length > 0 && (
        <div className="container mx-auto flex flex-col space-y-3 py-4">
          {favorites.map((school, index) => (
            <div
              key={index}
              className="flex flex-row items-center px-2 border border-slate-200 rounded-lg py-3 space-x-2">
              <button
                className={clsx('p-3', {
                  'text-red-500': isFavorite(school),
                  'text-slate-500': !isFavorite(school)
                })}
                onClick={() => favorite(school)}>
                {isFavorite(school) ? <BsHeartFill /> : <BsHeart />}
              </button>
              <div className="flex-[2]">{school.university}</div>
              <div className="flex-[3]">{school.department}</div>
              <div className="flex-1">{school.type}</div>
              <div className="flex-[2]">{school.quota}</div>
              <div className="flex-[2]">{school.arrangement}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
