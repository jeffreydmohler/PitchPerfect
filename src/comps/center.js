import React, { useState } from 'react'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import baseball from '../baseball.png'
import 'react-circular-progressbar/dist/styles.css'

const axios = require('axios')

let score = 0

export default function Create(props) {
  return <CreateController />
}
const CreateController = (props) => {
  const [pitch, setPitch] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
  }

  return (
    <Formik
      initialValues={{
        homeTeam: '',
        awayTeam: '',
        homeScore: 0,
        awayScore: 0,
        inning: 1,
        topbottom: '',
        strikes: 0,
        balls: 0,
        outs: 0,
        batter: '',
        pitcher: '',
        base1: 0,
        base2: 0,
        base3: 0,
        pitchnumber: 1,
        atbat: 1,
        infield: 'Standard',
        outfield: 'Standard',
        outcome: 'Called Strike'
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validate={(values) => {
        const errors = {}
        console.log('validating', values)
        if (values.strikes > 2) {
          errors.strikes = 'There can only be 2 strikes'
        }
        if (values.balls > 3) {
          errors.balls = 'There can only be 3 balls'
        }
        if (values.outs > 2) {
          errors.outs = 'There can only be 2 outs'
        }
        if (values.inning > 20) {
          errors.inning = 'There can only be 20 innings'
        }
        if (values.pitchnumber > 15) {
          errors.pitchnumber = 'There can only be 15 pitches'
        }
        if (values.inning > 20) {
          errors.inning = 'There can only be 20 innings'
        }
        if (values.topbottom === '') {
          errors.topbottom = 'Top or Bottom of inning is required'
        }
        if (values.batter === '') {
          errors.batter = 'Batter Handedness is required'
        }
        if (values.pitcher === '') {
          errors.pitcher = 'Pitcher Handedness is required'
        }

        return errors
      }}
      onSubmit={
        (handleSubmit,
        async (values, actions) => {
          console.log('submit', values)
          console.log(JSON.stringify(values))
          try {
            const resp = await axios.post('/api/predictm/', {
              values
              // enter in all the values
            })
            setPitch(resp.data)
            console.log(JSON.stringify(resp.data))
            score = resp.data
            score = parseFloat(score * 100).toFixed(2)

            document.documentElement.scrollTop = 0

            await new Promise((resolve) => {
              resolve()

              actions.setSubmitting(false)
            })
          } catch (e) {
            console.log('error', e)
          }
        })
      }>
      {(form) => <CreateForm form={form} pitch={pitch} />}
    </Formik>
  )
}

const CreateForm = (props) => (
  <Form>
    <bs.Container>
      <bs.Card.Header as='h5'>Predict Pitch Result -- Which Pitch Should You Throw?</bs.Card.Header>

      <bs.Row>
        <bs.Col md='10'>
          <bs.Card.Body>
            <bs.Row>
              <bs.Col md='6'>
                <Dropdown title='Home Team:' name='homeTeam' as='select' options={['ARI', 'ATL', 'BAL', 'BOS', 'CHC', 'CIN', 'CLE', 'COL', 'CWS', 'DET', 'HOU', 'KC', 'LAA', 'LAD', 'MIA', 'MIL', 'MIN', 'NYM', 'NYY', 'OAK', 'PHI', 'PIT', 'SD', 'SEA', 'SF', 'STL', 'TB', 'TEX', 'TOR', 'WSH']} disabled={props.form.isSubmitting} />{' '}
              </bs.Col>
              <bs.Col md='6'>
                <Dropdown title='Away Team:' name='awayTeam' as='select' options={['ARI', 'ATL', 'BAL', 'BOS', 'CHC', 'CIN', 'CLE', 'COL', 'CWS', 'DET', 'HOU', 'KC', 'LAA', 'LAD', 'MIA', 'MIL', 'MIN', 'NYM', 'NYY', 'OAK', 'PHI', 'PIT', 'SD', 'SEA', 'SF', 'STL', 'TB', 'TEX', 'TOR', 'WSH']} disabled={props.form.isSubmitting} />
              </bs.Col>
            </bs.Row>
            <bs.Row>
              <bs.Col md='4'>
                <Input title='Home Score:' name='homeScore' type='number' disabled={props.form.isSubmitting} />
              </bs.Col>
              <bs.Col md='4'>
                <Input title='Away Score:' name='awayScore' type='number' disabled={props.form.isSubmitting} />
              </bs.Col>
              <bs.Col md='2'>
                <Input title='Inning:' name='inning' type='number' disabled={props.form.isSubmitting} />
              </bs.Col>
              <bs.Col md='2'>
                <br />
                <Radio name='topbottom' type='radio' label='Top' value='T' />
                <Radio name='topbottom' type='radio' label='Bottom' value='B' />
              </bs.Col>
            </bs.Row>
            <bs.Row>
              <bs.Col md='4'>
                <Input title='Strikes:' name='strikes' type='number' disabled={props.form.isSubmitting} />
              </bs.Col>
              <bs.Col md='4'>
                <Input title='Balls:' name='balls' type='number' disabled={props.form.isSubmitting} />
              </bs.Col>
              <bs.Col md='4'>
                <Input title='Outs:' name='outs' type='number' disabled={props.form.isSubmitting} />
              </bs.Col>
            </bs.Row>
            <bs.Row>
              <bs.Col md='4'>
                <span className='form-label'>Batter:</span> <br />
                <Radio name='batter' type='radio' label='Left-Handed' value='L' />
                <br />
                <Radio name='batter' type='radio' label='Right-Handed' value='R' />
                <br />
                <br />{' '}
              </bs.Col>
              <bs.Col md='4'>
                <span className='form-label'>Pitcher:</span> <br />
                <Radio name='pitcher' type='radio' label='Left-Handed' value='L' />
                <br />
                <Radio name='pitcher' type='radio' label='Right-Handed' value='R' />
              </bs.Col>
              <bs.Col md='4'>
                <span className='form-label'>Which Bases are Occupied?</span> <br />
                <Radio name='base1' type='checkbox' label='1st Base' value='1' />
                <br />
                <Radio name='base2' type='checkbox' label='2nd Base' value='1' />
                <br />
                <Radio name='base3' type='checkbox' label='3rd Base' value='1' /> <br />
                <br />
              </bs.Col>
            </bs.Row>
            <bs.Row>
              <bs.Col md='6'>
                <Input title='Pitch Number of At-Bat:' name='pitchnumber' type='number' disabled={props.form.isSubmitting} />
              </bs.Col>
              <bs.Col md='6'>
                <Input title='At Bat Number (Overall):' name='atbat' type='number' disabled={props.form.isSubmitting} />
              </bs.Col>
            </bs.Row>
            <bs.Row>
              <bs.Col md='6'>
                <Dropdown title='Infield Alignment:' name='infield' as='select' options={['Standard', 'Infield Shift', 'Strategic']} disabled={props.form.isSubmitting} />{' '}
              </bs.Col>
              <bs.Col md='6'>
                <Dropdown title='Outfield Alignment:' name='outfield' as='select' options={['Standard', '4th Outfielder', 'Strategic']} disabled={props.form.isSubmitting} />
              </bs.Col>
            </bs.Row>
            <Dropdown title='Outcome Desired:' name='outcome' as='select' options={['Called Strike', 'Ball', 'Hit into Play and Score', 'Swinging Strike', 'Hit into Play', 'Foul Tip', 'Hit into Play No Out', 'Foul Ball', 'Swinging Strike Blocked', 'Blocked Ball', 'Foul Bunt', 'Pitchout', 'Hit By Pitch', 'Missed Bunt', 'Bunt Foul Tip']} disabled={props.form.isSubmitting} />
          </bs.Card.Body>
          <bs.Button type='submit' disabled={props.form.isSubmitting} className='mb-4 w-100 ml-3'>
            <bs.Spinner animation='border' variant='success' size='sm' style={{ visibility: props.form.isSubmitting ? 'visible' : 'hidden' }} />
            &nbsp; &nbsp; Predict
          </bs.Button>
        </bs.Col>
        <br />
        <br />
        <bs.Col md='2'>
          <br />
          <bs.Image src={baseball} height='25%' width='100%'></bs.Image>
          <br />
          <br />
          <h2>{props.pitch}</h2>
          <span className='text-center form-label'> Throw this pitch for the best chance of getting your desired outcome </span>
        </bs.Col>
      </bs.Row>
    </bs.Container>
  </Form>
)
const Input = (props) => (
  <Field name={props.name}>
    {(rProps) => (
      <bs.Form.Group>
        {props.title && <bs.Form.Label>{props.title}</bs.Form.Label>}
        <bs.Form.Control type={props.type} placeholder={props.placeholder} {...rProps.field} disabled={props.disabled} as={props.as} style={{ display: 'block', width: props.width }} maxLength={400} />

        {rProps.meta.touched && rProps.meta.error && <div className='text-danger'>{rProps.meta.error}</div>}
      </bs.Form.Group>
    )}
  </Field>
)

const Radio = (props) => <Field name={props.name}>{(rProps) => <bs.Form.Check inline name={props.name} type={props.type} placeholder={props.placeholder} {...rProps.field} disabled={props.disabled} label={props.label} value={props.value} />}</Field>

const Dropdown = (props) => (
  <Field name={props.name}>
    {(rProps) => (
      <bs.Form.Group>
        {props.title && <bs.Form.Label>{props.title}</bs.Form.Label>}
        <bs.Form.Control type={props.type} placeholder={props.placeholder} {...rProps.field} disabled={props.disabled} as={props.as} style={{ display: 'block', width: props.width }} maxLength={400}>
          {props.options.map((i) => {
            return <option>{i}</option>
          })}
        </bs.Form.Control>

        {rProps.meta.touched && rProps.meta.error && <div className='text-danger'>{rProps.meta.error}</div>}
      </bs.Form.Group>
    )}
  </Field>
)
