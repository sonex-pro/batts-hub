import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './supabaseClient'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNames = async () => {
      try {
        setLoading(true)
        
        // Fetch only the 'name' column from the 'users' table
        const { data, error } = await supabase
          .from('users')
          .select('name')
        
        if (error) {
          throw new Error(`Error fetching data: ${error.message}`)
        }
        
        setData(data)
      } catch (err) {
        console.error('Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchNames()
  }, [])

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Sports Club Minimal App</h1>
      
      {loading && <p>Loading data...</p>}
      
      {error && (
        <div style={{ color: 'red', margin: '1rem 0' }}>
          <p>Error: {error}</p>
          <p>Please check your Supabase configuration.</p>
        </div>
      )}
      
      {!loading && !error && (
        <>
          <h2>Data from Supabase:</h2>
          {data.length === 0 ? (
            <p>No data found. Make sure you've added test data to your Supabase table.</p>
          ) : (
            <ul>
              {data.map((row, index) => (
                <li key={index}>{row.name}</li>
              ))}
            </ul>
          )}
        </>
      )}
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h3>Setup Information:</h3>
        <p>This app is fetching the "name" column from the "users" table in your Supabase database.</p>
        <p>Make sure you've created this table and added some sample data.</p>
      </div>
    </div>
  )
}

export default App
