import React, { useEffect } from 'react'
import useRequest from '../hooks/useRequest'
import  '../style/faq.css'

const QuestionsAccordion = () => {
  const { data, error, fetchData, loading } = useRequest('Faq', 'POST')

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {!error && !loading ? (
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {data?.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse-${index}`}
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  {faq?.question}
                </button>
              </h2>
              <div
                id={`flush-collapse-${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">{faq?.answer}</div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default QuestionsAccordion
