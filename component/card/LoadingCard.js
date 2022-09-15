export const LoadingCard = () => {
  return (
         <div className='col-md-6'>
            <div className='box-height-medium my-3'>
                <div className="exlusive-boxHeading-loading">
                  <div className="line"></div>
                  <div className="line line-2"></div>
                 </div>
            </div>
          </div> 
  
  )
}
export const LoadingPosts = () => {
  const loadPages = [1,2]
  return (
    <div className="infine-scroll-padding space-bottom-height">
    <div className="row g-3">
         {
          loadPages.map((num,index) => {
            return <LoadingCard key={index} />
           })
         }
    </div>
    </div>
  )
}

