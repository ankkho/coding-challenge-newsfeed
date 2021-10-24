import Link from 'next/link';
import styled from 'styled-components'

export default function HomeLink() {
    return (
        <Center>
            <Link href="/">Home</Link>
        </Center>
    )
  }

const Center = styled.div`
text-align: center;
`
