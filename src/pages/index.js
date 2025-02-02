import Head from "next/head";
import { useState } from "react";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Form from "@/components/Form";
import FormRow from "@/components/FormRow";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Card from "@/components/Card";

import styles from "@/styles/Home.module.scss";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [attributes, setAttributes] = useState();
  const [image, setImage] = useState();

  async function handleOnGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    setAttributes(undefined);
    setImage(undefined);
    try {
      const results = await fetch("/api/pokemon/create").then((r) => r.json());
      setAttributes(results.attributes);

      const { image } = await fetch("/api/pokemon/image", {
        method: "POST",
        body: JSON.stringify({
          description: results.attributes.appearance,
        }),
      }).then((r) => r.json());
      setImage(image);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Layout>
      <Head>
        <title>Pokémon Generator</title>
        <meta name="description" content="Create a new Pokémon with AI!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Container className={styles.cardContainer}>
          <div className={styles.card}>
            <Card attributes={attributes} image={image} />
            <h2>Backstory</h2>
            {attributes?.backstory ? (
              <p>{attributes.backstory.substring(0, 600)}...</p>
            ) : (
              <p>Backstory</p>
            )}
          </div>
          <Form className={styles.form}>
            <h2>Create a new Pokémon!</h2>
            {/* <FormRow>
              <label>Type</label>
              <FormInput name="type" />
            </FormRow> */}
            <FormRow>
              <Button onClick={handleOnGenerate}>Generate</Button>
            </FormRow>
          </Form>
        </Container>
      </Section>
    </Layout>
  );
}
