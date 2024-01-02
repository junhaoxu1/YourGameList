import React, { useEffect } from "react"
import { useForm, SubmitHandler} from 'react-hook-form'
import { Form, InputGroup, Button } from "react-bootstrap"
import { Review } from "../types/Review.types"

interface ReviewProps {
    onAddReview: (data: Review) => Promise<void>
}

const NewReviewComponent = ({ onAddReview} : ReviewProps) => {

    const { handleSubmit, register, formState: { isSubmitSuccessful }, reset } = useForm<Review>()

    const onSubmitReview: SubmitHandler<Review> = async (data: Review) => {
        await onAddReview(data)
      }

      useEffect(() => {
        reset()
      }, [isSubmitSuccessful, reset])

  return (
    <>
        <Form onSubmit={handleSubmit(onSubmitReview)}>
            <InputGroup>
                <Form.Label>Write your review here!</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    className="d-flex flex"
                    {...register('text')}
                />
                <Button
                    type="submit"
                    variant="success"
                >Review Game</Button>
            </InputGroup>
          </Form>
    </>
  )
}

export default NewReviewComponent